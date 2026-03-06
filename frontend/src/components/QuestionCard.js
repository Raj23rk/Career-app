function QuestionCard({ question, onAnswer }) {

  return (

    <div className="bg-white shadow-md p-6 rounded mb-4">

      <h3 className="text-lg font-semibold mb-4">
        {question.questionText}
      </h3>

      {question.options.map((opt, i) => (

        <div key={i} className="mb-2">

          <label>

            <input
              type="radio"
              name={question._id}
              onChange={() => onAnswer(question._id, opt.value)}
              className="mr-2"
            />

            {opt.text}

          </label>

        </div>

      ))}

    </div>

  );
}

export default QuestionCard;