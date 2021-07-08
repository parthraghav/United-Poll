import { FirebaseApp } from "../firebase";
const uuid = require("react-uuid");

export const askQuestion = async (questionText: string) => {
  const currentUser = FirebaseApp.auth.currentUser;
  // Terminate if user is not logged in
  if (!currentUser) return;

  const questions = FirebaseApp.db.collection("questions");
  const questionId = uuid();
  questionText = questionText.trim();
  // Enforce max 150 characters text limit
  if (questionText.length > 150) return;

  // Build Question Doc
  const questionDoc = {
    id: questionId,
    qid: questionId,
    posted_by: currentUser.uid,
    is_visible: false,
    text: questionText,
    answer_count: 0,
    answered_by_politicians: {},
    created_at: FirebaseApp.fieldValue.serverTimestamp(),
    updated_at: FirebaseApp.fieldValue.serverTimestamp(),
    click_count: 0,
  };

  await questions.doc(questionId).set(questionDoc);
};

export const getTopQuestions = async () => {
  const questions = FirebaseApp.db.collection("questions");
  const result = await questions
    .where("is_visible", "==", true)
    .orderBy("answer_count", "desc")
    .limit(100)
    .get();
  return result.docs.map((doc) => doc.data());
};

export const getQuestionInfo = async (questionId: string) => {
  const questions = FirebaseApp.db.collection("questions");
  const result = await questions.doc(questionId).get();
  return result.data();
};

export const getQuestionsAnsweredByPolitician = async (
  politicianId: string
) => {
  const questions = FirebaseApp.db.collection("questions");
  const result = await questions
    .where("is_visible", "==", true)
    .where(`answered_by_politicians.${politicianId}`, "==", true)
    .limit(100)
    .get();
  return result.docs.map((doc) => doc.data());
};

interface getQuestionSuggestionsProps {
  q: string;
  u1?: string;
  u2?: string;
}

export const getQuestionSuggestions = async (
  props: getQuestionSuggestionsProps
) => {
  const questions = FirebaseApp.db.collection("questions");
  let query = questions.where("is_visible", "==", true);
  if (props.u1)
    query = query.where(`answered_by_politicians.${props.u1}`, "==", true);
  if (props.u2)
    query = query.where(`answered_by_politicians.${props.u2}`, "==", true);

  query = query.limit(100);

  const result = await query.get();
  return result.docs.map((doc) => doc.data());
};
