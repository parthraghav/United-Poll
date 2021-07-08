import { FirebaseApp } from "../firebase";
import { isValidYoutubeUrl } from "./utils";
const uuid = require("react-uuid");

interface addAnswerProps {
  qid: string;
  pid: string;
  ytlink: string;
  start: number;
  end: number;
}

export const addAnswer = async (props: addAnswerProps) => {
  const currentUser = FirebaseApp.auth.currentUser;
  // Terminate if user is not logged in
  if (!currentUser) return;

  const answers = FirebaseApp.db.collection("answers");
  const questions = FirebaseApp.db.collection("questions");
  const politicians = FirebaseApp.db.collection("politicians");
  const answerId = uuid();
  // Enforce max 150 characters text limit
  if (!isValidYoutubeUrl(props.ytlink)) return;

  // Build Answer Doc
  const answerDoc = {
    id: answerId,
    aid: answerId,
    qid: props.qid,
    pid: props.pid,
    ytlink: props.ytlink,
    start: props.start,
    end: props.end,
    posted_by: currentUser.uid,
    is_visible: false,
    annotations: [],
    created_at: FirebaseApp.fieldValue.serverTimestamp(),
    updated_at: FirebaseApp.fieldValue.serverTimestamp(),
    click_count: 0,
  };

  await answers.doc(answerId).set(answerDoc);

  await questions.doc(props.qid).update({
    [`answers.${props.pid}`]: answerId,
    [`answered_by_politicians.${props.pid}`]: true,
    answer_count: FirebaseApp.fieldValue.increment(1),
  });

  await politicians.doc(props.pid).update({
    answer_count: FirebaseApp.fieldValue.increment(1),
    question_count: FirebaseApp.fieldValue.increment(1),
  });
};

interface getAnswersForQuestionProps {
  qid: string;
  politicians: Array<string>;
}

export const getAnswersForQuestion = async (
  props: getAnswersForQuestionProps
) => {
  const answers = FirebaseApp.db.collection("answers");
  let query = answers.where("is_visible", "==", true);
  if (props.politicians.length > 0)
    query = query.where("pid", "in", props.politicians);
  query = query
    .where("qid", "==", props.qid)
    .orderBy("created_at", "desc")
    .limit(2);
  const result = await query.get();
  return result.docs.map((doc) => doc.data());
};
