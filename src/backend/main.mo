import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Type definitions
  public type Category = {
    #allJewellery;
    #necklaces;
    #earrings;
    #bracelets;
    #anklets;
    #hairAccessories;
    #bags;
    #customize;
    #giftHampers;
    #otherAccessories;
  };

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat; // Price in paise/cents
    category : Category;
    imageUrl : Text;
    inStock : Bool;
  };

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
    giftMessage : ?Text;
    sendAsGift : Bool;
  };

  public type Order = {
    id : Nat;
    items : [CartItem];
    totalAmount : Nat;
    giftMessage : ?Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    shippingAddress : Text;
  };

  // Product comparison module
  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, List.List<CartItem>>();
  let orders = Map.empty<Principal, List.List<Order>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextProductId = 1;
  var nextOrderId = 1;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product management
  public shared ({ caller }) func addProduct(product : Product) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let productId = nextProductId;
    nextProductId += 1;
    products.add(productId, { product with id = productId });
    productId;
  };

  public query func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query func getProductsByCategory(category : Category) : async [Product] {
    let filteredProducts = products.values().toArray().filter(
      func(product) { product.category == category }
    );
    filteredProducts;
  };

  public query func getProductById(productId : Nat) : async ?Product {
    products.get(productId);
  };

  // Shopping cart management
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add items to cart");
    };

    if (quantity == 0) {
      Runtime.trap("Quantity must be greater than 0");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    // Check if product exists
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (_) {
        // Check if item already exists in cart
        let itemIndex = cart.values().enumerate().find(
          func((_, item)) { item.productId == productId }
        );

        let newItem : CartItem = {
          productId;
          quantity;
          giftMessage = null;
          sendAsGift = false;
        };

        // Update cart with new item
        cart.add(newItem);
        carts.add(caller, cart);
      };
    };
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };

    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };

    carts.remove(caller);
  };

  // Order management
  public shared ({ caller }) func placeOrder(giftMessage : ?Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) { cart };
    };

    if (cart.isEmpty()) {
      Runtime.trap("Cart is empty");
    };

    let totalAmount = cart.values().foldLeft(
      0,
      func(acc, item) {
        switch (products.get(item.productId)) {
          case (null) { acc };
          case (?product) { acc + (product.price * item.quantity) };
        };
      },
    );

    let orderId = nextOrderId;
    nextOrderId += 1;

    let order : Order = {
      id = orderId;
      items = cart.toArray();
      totalAmount;
      giftMessage;
    };

    let userOrders = switch (orders.get(caller)) {
      case (null) { List.empty<Order>() };
      case (?existingOrders) { existingOrders };
    };

    userOrders.add(order);
    orders.add(caller, userOrders);
    carts.remove(caller); // Clear cart after placing order
    orderId;
  };

  public query ({ caller }) func getOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };

    switch (orders.get(caller)) {
      case (null) { [] };
      case (?userOrders) { userOrders.toArray() };
    };
  };
};
