import { FirebaseApp } from "../firebase";
const uuid = require("react-uuid");

export interface Politician {
  name: string;
  party: string;
  imageLink: string;
}

export const addPoliticianUNSAFE = async (politician: Politician) => {
  const currentUser = FirebaseApp.auth.currentUser;
  // Terminate if user is not logged in
  if (!currentUser) return;

  const politicians = FirebaseApp.db.collection("politicians");
  const politicianId = uuid();

  // Build Question Doc
  const politicianDoc = {
    id: politicianId,
    pid: politicianId,
    posted_by: currentUser.uid,
    is_visible: false,
    full_name: politician.name,
    display_picture_link: politician.imageLink,
    party_affiliation: politician.party,
    question_count: 0,
    answer_count: 0,
    answered_by_politicians: [],
    questions_answered: [],
    answers: [],
    created_at: FirebaseApp.fieldValue.serverTimestamp(),
    updated_at: FirebaseApp.fieldValue.serverTimestamp(),
    click_count: 0,
  };

  await politicians.doc(politicianId).set(politicianDoc);
};

export const getActivePoliticians = async () => {
  const politicians = FirebaseApp.db.collection("politicians");
  const result = await politicians
    .where("is_visible", "==", true)
    .orderBy("answer_count", "desc")
    .limit(10)
    .get();
  return result.docs.map((doc) => doc.data() as unknown as Politician);
};

export const getPoliticianInfo = async (politicianId: string) => {
  const politicians = FirebaseApp.db.collection("politicians");
  const politicianDoc = await politicians.doc(politicianId).get();
  if (politicianDoc.exists) {
    return politicianDoc.data();
  }
};

export const searchPoliticians = async (searchQuery: string) => {
  const politicians = FirebaseApp.db.collection("politicians");
  let searchTerm = searchQuery;
  const strlength = searchTerm.length;
  const strFrontCode = searchTerm.slice(0, strlength - 1);
  const strEndCode = searchTerm.slice(strlength - 1, searchTerm.length);
  const endCode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
  const result = await politicians
    .where("full_name", ">=", searchTerm)
    .where("full_name", "<", endCode)
    .limit(10)
    .get();
  console.log(result.docs);
  console.log("fuck");
  return result.docs.map((doc) => {
    const politician = doc.data();
    return {
      ...politician,
      label: politician.full_name,
      value: politician.id,
    };
  });
};
