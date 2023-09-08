//Component Import
import { Card } from "./Card";

//Styled Components Import
import { LoadingSubTitle, SubTitle } from "../styledComponents/SubTitle";
import { SubmitButton } from "../styledComponents/Button";
import { Paragraph } from "../styledComponents/Paragraph";

//Service Hooks Import
import useQuizData, { RequestStatus } from "../services-hooks/useQuizData";

export default function QuizScreen({ className, apiParams }) {
  const {
    data,
    error,
    finish,
    gameIsRunning,
    selectOption,
    restart,
    score,
    newGame,
    status,
  } = useQuizData(apiParams);

  if (status === RequestStatus.Pending || status === RequestStatus.Idle) {
    return (
      <main className={className}>
        <div className="loader">
          <div className="loading--Animation"></div>
          <LoadingSubTitle>Loading</LoadingSubTitle>
        </div>
      </main>
    );
  }

  if (status === RequestStatus.Rejected && error) {
    return (
      <main className={className}>
        <SubTitle>Something went wrong! {error?.message}</SubTitle>
      </main>
    );
  }

  return (
    <main className={className}>
      {data?.map((quiz) => (
        <Card
          gameIsRunning={gameIsRunning}
          difficulty={apiParams.difficulty}
          key={quiz.questionId}
          questionId={quiz.questionId}
          question={quiz.question}
          options={quiz.options}
          selectedOptionId={quiz.selectedOptionId}
          selectOption={selectOption}
          answerId={quiz.answer.id}
        />
      ))}
      {gameIsRunning ? (
        <SubmitButton onClick={finish}>Check Answers</SubmitButton>
      ) : (
        <>
          <Paragraph>
            Your score is {score} out of {data.length}
          </Paragraph>
          <SubmitButton onClick={newGame}>New Game</SubmitButton>
          <SubmitButton onClick={restart}>Retry</SubmitButton>
        </>
      )}
    </main>
  );
}