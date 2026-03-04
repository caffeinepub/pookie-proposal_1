import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Bouquet = {
    flowers : [Text];
    timestamp : Time.Time;
  };

  type Letter = {
    id : Nat;
    author : Text;
    content : Text;
    timestamp : Time.Time;
  };

  type Note = {
    id : Nat;
    author : Text;
    imageData : Text;
    caption : Text;
    timestamp : Time.Time;
  };

  type WeddingCertificate = {
    bishalSigned : Bool;
    aasthaSigned : Bool;
    bishalSignedAt : ?Time.Time;
    aasthaSignedAt : ?Time.Time;
    weddingDate : Text;
  };

  var bouquetForAastha : Bouquet = {
    flowers = Array.empty<Text>();
    timestamp = 0;
  };

  var bouquetForBishal : Bouquet = {
    flowers = Array.empty<Text>();
    timestamp = 0;
  };

  var nextLetterId = 1;
  var nextNoteId = 1;

  let letters = Map.empty<Nat, Letter>();
  let notes = Map.empty<Nat, Note>();

  var weddingCertificate : WeddingCertificate = {
    bishalSigned = false;
    aasthaSigned = false;
    bishalSignedAt = null;
    aasthaSignedAt = null;
    weddingDate = "";
  };

  public shared ({ caller }) func addFlowersForAastha(flowers : [Text]) : async () {
    bouquetForAastha := {
      flowers;
      timestamp = Time.now();
    };
  };

  public shared ({ caller }) func addFlowersForBishal(flowers : [Text]) : async () {
    bouquetForBishal := {
      flowers;
      timestamp = Time.now();
    };
  };

  public query ({ caller }) func getBouquetForAastha() : async Bouquet {
    bouquetForAastha;
  };

  public query ({ caller }) func getBouquetForBishal() : async Bouquet {
    bouquetForBishal;
  };

  public shared ({ caller }) func addLetter(author : Text, content : Text) : async Nat {
    let id = nextLetterId;
    nextLetterId += 1;
    let letter : Letter = {
      id;
      author;
      content;
      timestamp = Time.now();
    };
    letters.add(id, letter);
    id;
  };

  public query ({ caller }) func getAllLetters() : async [Letter] {
    letters.values().toArray();
  };

  public shared ({ caller }) func deleteLetter(id : Nat) : async Bool {
    switch (letters.get(id)) {
      case (null) { false };
      case (?_) {
        letters.remove(id);
        true;
      };
    };
  };

  public shared ({ caller }) func addHandwrittenNote(author : Text, imageData : Text, caption : Text) : async Nat {
    let id = nextNoteId;
    nextNoteId += 1;
    let note : Note = {
      id;
      author;
      imageData;
      caption;
      timestamp = Time.now();
    };
    notes.add(id, note);
    id;
  };

  public query ({ caller }) func getAllHandwrittenNotes() : async [Note] {
    notes.values().toArray();
  };

  public shared ({ caller }) func deleteHandwrittenNote(id : Nat) : async Bool {
    switch (notes.get(id)) {
      case (null) { false };
      case (?_) {
        notes.remove(id);
        true;
      };
    };
  };

  public shared ({ caller }) func signWeddingCertificateAsBishal() : async () {
    weddingCertificate := {
      weddingCertificate with
      bishalSigned = true;
      bishalSignedAt = ?Time.now();
    };
  };

  public shared ({ caller }) func signWeddingCertificateAsAastha() : async () {
    weddingCertificate := {
      weddingCertificate with
      aasthaSigned = true;
      aasthaSignedAt = ?Time.now();
    };
  };

  public query ({ caller }) func getWeddingCertificate() : async WeddingCertificate {
    weddingCertificate;
  };

  public shared ({ caller }) func setWeddingDate(date : Text) : async () {
    weddingCertificate := {
      weddingCertificate with weddingDate = date;
    };
  };
};
