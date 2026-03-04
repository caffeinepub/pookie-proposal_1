import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";

actor {
  type Bouquet = {
    flowers : [Text];
    timestamp : Time.Time;
  };

  module Bouquet {
    public func create(flowers : [Text]) : Bouquet {
      {
        flowers;
        timestamp = Time.now();
      };
    };
  };

  type ProposalResponse = {
    accepted : Bool;
    timestamp : Time.Time;
  };

  module ProposalResponse {
    public func create(accepted : Bool) : ProposalResponse {
      {
        accepted;
        timestamp = Time.now();
      };
    };
  };

  var currentBouquet : Bouquet = {
    flowers = Array.empty<Text>();
    timestamp = 0;
  };

  var currentResponse : ?ProposalResponse = null;

  public shared ({ caller }) func saveBouquet(flowers : [Text]) : async () {
    currentBouquet := Bouquet.create(flowers);
  };

  public shared ({ caller }) func saveProposalResponse(accepted : Bool) : async () {
    currentResponse := ?ProposalResponse.create(accepted);
  };

  public query ({ caller }) func getBouquet() : async Bouquet {
    currentBouquet;
  };

  public query ({ caller }) func getProposalResponse() : async ?ProposalResponse {
    currentResponse;
  };
};
