import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldActor = {
    currentBouquet : { flowers : [Text]; timestamp : Int };
    currentResponse : ?{ accepted : Bool; timestamp : Int };
  };
  type NewActor = {
    bouquetForAastha : {
      flowers : [Text];
      timestamp : Int;
    };
    bouquetForBishal : {
      flowers : [Text];
      timestamp : Int;
    };
    nextLetterId : Nat;
    nextNoteId : Nat;
    letters : Map.Map<Nat, {
      id : Nat;
      author : Text;
      content : Text;
      timestamp : Int;
    }>;
    notes : Map.Map<Nat, {
      id : Nat;
      author : Text;
      imageData : Text;
      caption : Text;
      timestamp : Int;
    }>;
    weddingCertificate : {
      bishalSigned : Bool;
      aasthaSigned : Bool;
      bishalSignedAt : ?Int;
      aasthaSignedAt : ?Int;
      weddingDate : Text;
    };
  };

  public func run(_old : OldActor) : NewActor {
    let bouquet = {
      flowers = [] : [Text];
      timestamp = 0;
    };
    let weddingCertificate = {
      bishalSigned = false;
      aasthaSigned = false;
      bishalSignedAt = null;
      aasthaSignedAt = null;
      weddingDate = "";
    };
    {
      bouquetForAastha = bouquet;
      bouquetForBishal = bouquet;
      nextLetterId = 1;
      nextNoteId = 1;
      letters = Map.empty<Nat, {
        id : Nat;
        author : Text;
        content : Text;
        timestamp : Int;
      }>();
      notes = Map.empty<Nat, {
        id : Nat;
        author : Text;
        imageData : Text;
        caption : Text;
        timestamp : Int;
      }>();
      weddingCertificate;
    };
  };
};
