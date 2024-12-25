import { useEffect, useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight, FaBars } from "react-icons/fa";
import Timer from "../components/Timer";
function Test() {
  const questions = [
    {
      index: 1,
      question: "What is the capital of France?",
      options: [
        { label: "A", answer: "Berlin" },
        { label: "B", answer: "Madrid" },
        { label: "C", answer: "Paris" },
        { label: "D", answer: "Rome" },
      ],
      correctAnswer: "C",
    },
    {
      index: 2,
      question: "Which planet is known as the Red Planet?",
      options: [
        { label: "A", answer: "Earth" },
        { label: "B", answer: "Mars" },
        { label: "C", answer: "Venus" },
        { label: "D", answer: "Jupiter" },
      ],
      correctAnswer: "B",
    },
    {
      index: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        { label: "A", answer: "Atlantic Ocean" },
        { label: "B", answer: "Indian Ocean" },
        { label: "C", answer: "Arctic Ocean" },
        { label: "D", answer: "Pacific Ocean" },
      ],
      correctAnswer: "D",
    },
    {
      index: 4,
      question: "Who developed the theory of relativity?",
      options: [
        { label: "A", answer: "Isaac Newton" },
        { label: "B", answer: "Albert Einstein" },
        { label: "C", answer: "Nikola Tesla" },
        { label: "D", answer: "Galileo Galilei" },
      ],
      correctAnswer: "B",
    },
    {
      index: 5,
      question: "What is the hardest natural substance on Earth?",
      options: [
        { label: "A", answer: "Gold" },
        { label: "B", answer: "Diamond" },
        { label: "C", answer: "Iron" },
        { label: "D", answer: "Platinum" },
      ],
      correctAnswer: "B",
    },
    {
      index: 6,
      question: "Which animal is known as the King of the Jungle?",
      options: [
        { label: "A", answer: "Elephant" },
        { label: "B", answer: "Lion" },
        { label: "C", answer: "Tiger" },
        { label: "D", answer: "Giraffe" },
      ],
      correctAnswer: "B",
    },
    {
      index: 7,
      question: "What is the largest continent by area?",
      options: [
        { label: "A", answer: "Africa" },
        { label: "B", answer: "Asia" },
        { label: "C", answer: "Europe" },
        { label: "D", answer: "North America" },
      ],
      correctAnswer: "B",
    },
    {
      index: 8,
      question: "Which element is represented by the symbol 'O'?",
      options: [
        { label: "A", answer: "Oxygen" },
        { label: "B", answer: "Osmium" },
        { label: "C", answer: "Ozone" },
        { label: "D", answer: "Olivine" },
      ],
      correctAnswer: "A",
    },
    {
      index: 9,
      question: "What is the speed of light?",
      options: [
        { label: "A", answer: "300,000 km/s" },
        { label: "B", answer: "150,000 km/s" },
        { label: "C", answer: "1,000,000 km/s" },
        { label: "D", answer: "3,000 km/s" },
      ],
      correctAnswer: "A",
    },
    {
      index: 10,
      question: `The tragedy of "Romeo and Juliet" is one of the most enduring and poignant love stories in literature. Written by William Shakespeare in the late 16th century, the play continues to captivate audiences around the world. The story is set in Verona, Italy, a city torn by the intense feud between two noble families, the Montagues and the Capulets. These families have been at odds for decades, and the animosity between them has brought about widespread violence and hatred. Against this backdrop of conflict, the young Romeo Montague and Juliet Capulet fall in love at first sight, an innocent and passionate romance that blossoms amidst the chaos and enmity that surrounds them. Despite their families’ bitter rivalry, Romeo and Juliet are drawn together by a powerful and undeniable attraction, setting the stage for the events that would ultimately lead to their tragic end. 
      The fateful encounter between Romeo and Juliet occurs at a grand masquerade ball hosted by the Capulets. Romeo, who initially does not intend to attend, sneaks into the event with his friends Benvolio and Mercutio. There, Romeo spots Juliet, and the two exchange flirtatious glances and poetic dialogue. Their love is instantaneous and intense, and they soon discover each other’s true identities. Despite the knowledge that they belong to rival families, they are undeterred by the dangers their love presents. Romeo, eager to act on his newfound affection, seeks out Juliet the next day, and the two secretly marry with the help of Friar Laurence, a Catholic priest who hopes that their union might one day bring peace between the warring families.
      However, their secret marriage is quickly overshadowed by a series of tragic events. In the heat of a street fight, Tybalt, a Capulet, challenges Romeo to a duel after Romeo refuses to fight him. Tybalt’s anger is fueled by Romeo’s presence at the Capulet ball, and he seeks to avenge the perceived dishonor. Romeo, now secretly married to Juliet, refuses to fight Tybalt and instead tries to mediate the situation. This leads to the intervention of Romeo’s friend Mercutio, who, in defending Romeo’s honor, takes up Tybalt’s challenge. Mercutio is fatally wounded, and in a fit of rage and grief, Romeo kills Tybalt in retaliation. This act of violence causes Romeo to flee Verona, leaving Juliet devastated and caught between her love for Romeo and her loyalty to her family. 
      As Romeo is exiled, Juliet is pressured by her parents to marry Paris, a nobleman chosen for her by her father. Desperate to avoid this marriage and to be reunited with Romeo, Juliet turns to Friar Laurence for help. The friar devises a plan for Juliet to fake her own death by drinking a potion that will make her appear lifeless for 42 hours. He promises that once she awakens, Romeo will be there to rescue her, and they can escape together. Juliet agrees to the plan, and she takes the potion the night before her arranged wedding to Paris. 
      Unfortunately, the plan goes awry. Romeo, unaware of the friar’s scheme, hears only that Juliet has died. Devastated by her apparent death, Romeo purchases poison and returns to Juliet’s tomb. There, he encounters Paris, who is mourning Juliet’s death. After a brief altercation, Romeo kills Paris and enters the tomb, where he finds Juliet’s seemingly lifeless body. In his grief, he drinks the poison and dies beside her. Juliet awakens to find Romeo dead and, in her desperation, takes her own life with his dagger. 
      The deaths of Romeo and Juliet finally bring the Montagues and Capulets to their senses. The families, devastated by the loss of their children, vow to end their feud and reconcile. However, it is too late for Romeo and Juliet, whose love, though pure and passionate, was doomed by the violence and hatred that surrounded them. The play concludes with the poignant reflection that the love of Romeo and Juliet, though tragic, has the power to bring about change, even if it is too late to save them. Shakespeare’s "Romeo and Juliet" serves as a timeless exploration of the destructive power of hatred, the fleeting nature of life, and the transformative power of love. The play’s themes continue to resonate with audiences today, making it one of the most frequently performed and adapted works in the history of literature. It asks enduring questions about the ways in which love, family, and fate shape our lives, and it remains a powerful meditation on the consequences of violence and division.
      Despite the tragic nature of the story, "Romeo and Juliet" offers moments of beauty and hope. The passionate love between the two protagonists, while fleeting, is portrayed as an idealistic and pure form of love that transcends the boundaries of family, society, and even death itself. The play’s enduring popularity can be attributed not only to its compelling characters and emotional depth but also to its exploration of universal themes that remain relevant across time and cultures. From the destructive forces of hatred and vengeance to the redemptive power of love, "Romeo and Juliet" captures the complexities of the human experience and continues to speak to audiences around the world. In addition to its literary and philosophical depth, the play has also been widely adapted in various forms, including opera, ballet, film, and musical theater. One of the most famous adaptations is the 1961 film "West Side Story," which transposes the story to 1950s New York City, using gang rivalry as the backdrop for the tale of star-crossed lovers. This modern reinterpretation of the play underscores its universal themes and proves that Shakespeare’s work is as relevant today as it was over 400 years ago. 
      The continued relevance of "Romeo and Juliet" is a testament to the timelessness of its themes and its profound impact on literature, theater, and culture. Its exploration of the human condition, the power of love, and the consequences of hatred makes it one of the most enduring works of art in history. From its poetic language and memorable characters to its timeless message of the dangers of familial conflict and the redemptive power of love, "Romeo and Juliet" remains a beloved and influential piece of literature that continues to shape our understanding of the world around us.`,
      options: [
        {
          label: "A",
          answer:
            "Charles Dickens - Famous for works like 'A Tale of Two Cities' and 'Great Expectations', which explored social inequality and personal redemption.",
        },
        {
          label: "B",
          answer:
            "William Shakespeare - Often considered the greatest writer in the English language, known for his plays, sonnets, and exploration of human nature.",
        },
        {
          label: "C",
          answer:
            "Jane Austen - Renowned for her novels on the British landed gentry, such as 'Pride and Prejudice' and 'Sense and Sensibility,' which examined social class and marriage.",
        },
        {
          label: "D",
          answer:
            "George Orwell - Famous for his political works like '1984' and 'Animal Farm,' which critiqued totalitarian regimes and social injustice.",
        },
      ],
      correctAnswer: "B",
    },
    {
      index: 11,
      question: "What is the capital of France?",
      options: [
        { label: "A", answer: "Berlin" },
        { label: "B", answer: "Madrid" },
        { label: "C", answer: "Paris" },
        { label: "D", answer: "Rome" },
      ],
      correctAnswer: "C",
    },
    {
      index: 12,
      question: "Which planet is known as the Red Planet?",
      options: [
        { label: "A", answer: "Earth" },
        { label: "B", answer: "Mars" },
        { label: "C", answer: "Venus" },
        { label: "D", answer: "Jupiter" },
      ],
      correctAnswer: "B",
    },
    {
      index: 13,
      question: "What is the largest ocean on Earth?",
      options: [
        { label: "A", answer: "Atlantic Ocean" },
        { label: "B", answer: "Indian Ocean" },
        { label: "C", answer: "Arctic Ocean" },
        { label: "D", answer: "Pacific Ocean" },
      ],
      correctAnswer: "D",
    },
    {
      index: 14,
      question: "Who developed the theory of relativity?",
      options: [
        { label: "A", answer: "Isaac Newton" },
        { label: "B", answer: "Albert Einstein" },
        { label: "C", answer: "Nikola Tesla" },
        { label: "D", answer: "Galileo Galilei" },
      ],
      correctAnswer: "B",
    },
    {
      index: 15,
      question: "What is the hardest natural substance on Earth?",
      options: [
        { label: "A", answer: "Gold" },
        { label: "B", answer: "Diamond" },
        { label: "C", answer: "Iron" },
        { label: "D", answer: "Platinum" },
      ],
      correctAnswer: "B",
    },
    {
      index: 16,
      question: "Which animal is known as the King of the Jungle?",
      options: [
        { label: "A", answer: "Elephant" },
        { label: "B", answer: "Lion" },
        { label: "C", answer: "Tiger" },
        { label: "D", answer: "Giraffe" },
      ],
      correctAnswer: "B",
    },
    {
      index: 17,
      question: "What is the largest continent by area?",
      options: [
        { label: "A", answer: "Africa" },
        { label: "B", answer: "Asia" },
        { label: "C", answer: "Europe" },
        { label: "D", answer: "North America" },
      ],
      correctAnswer: "B",
    },
    {
      index: 18,
      question: "Which element is represented by the symbol 'O'?",
      options: [
        { label: "A", answer: "Oxygen" },
        { label: "B", answer: "Osmium" },
        { label: "C", answer: "Ozone" },
        { label: "D", answer: "Olivine" },
      ],
      correctAnswer: "A",
    },
    {
      index: 19,
      question: "What is the speed of light?",
      options: [
        { label: "A", answer: "300,000 km/s" },
        { label: "B", answer: "150,000 km/s" },
        { label: "C", answer: "1,000,000 km/s" },
        { label: "D", answer: "3,000 km/s" },
      ],
      correctAnswer: "A",
    },
    {
      index: 20,
      question: "What is the speed of light?",
      options: [
        { label: "A", answer: "300,000 km/s" },
        { label: "B", answer: "150,000 km/s" },
        { label: "C", answer: "1,000,000 km/s" },
        { label: "D", answer: "3,000 km/s" },
      ],
      correctAnswer: "A",
    },
    {
      index: 21,
      question: "What is the capital of France?",
      options: [
        { label: "A", answer: "Berlin" },
        { label: "B", answer: "Madrid" },
        { label: "C", answer: "Paris" },
        { label: "D", answer: "Rome" },
      ],
      correctAnswer: "C",
    },
    {
      index: 22,
      question: "Which planet is known as the Red Planet?",
      options: [
        { label: "A", answer: "Earth" },
        { label: "B", answer: "Mars" },
        { label: "C", answer: "Venus" },
        { label: "D", answer: "Jupiter" },
      ],
      correctAnswer: "B",
    },
    {
      index: 23,
      question: "What is the largest ocean on Earth?",
      options: [
        { label: "A", answer: "Atlantic Ocean" },
        { label: "B", answer: "Indian Ocean" },
        { label: "C", answer: "Arctic Ocean" },
        { label: "D", answer: "Pacific Ocean" },
      ],
      correctAnswer: "D",
    },
    {
      index: 24,
      question: "Who developed the theory of relativity?",
      options: [
        { label: "A", answer: "Isaac Newton" },
        { label: "B", answer: "Albert Einstein" },
        { label: "C", answer: "Nikola Tesla" },
        { label: "D", answer: "Galileo Galilei" },
      ],
      correctAnswer: "B",
    },
    {
      index: 25,
      question: "What is the hardest natural substance on Earth?",
      options: [
        { label: "A", answer: "Gold" },
        { label: "B", answer: "Diamond" },
        { label: "C", answer: "Iron" },
        { label: "D", answer: "Platinum" },
      ],
      correctAnswer: "B",
    },
    {
      index: 26,
      question: "Which animal is known as the King of the Jungle?",
      options: [
        { label: "A", answer: "Elephant" },
        { label: "B", answer: "Lion" },
        { label: "C", answer: "Tiger" },
        { label: "D", answer: "Giraffe" },
      ],
      correctAnswer: "B",
    },
    {
      index: 27,
      question: "What is the largest continent by area?",
      options: [
        { label: "A", answer: "Africa" },
        { label: "B", answer: "Asia" },
        { label: "C", answer: "Europe" },
        { label: "D", answer: "North America" },
      ],
      correctAnswer: "B",
    },
    {
      index: 28,
      question: "Which element is represented by the symbol 'O'?",
      options: [
        { label: "A", answer: "Oxygen" },
        { label: "B", answer: "Osmium" },
        { label: "C", answer: "Ozone" },
        { label: "D", answer: "Olivine" },
      ],
      correctAnswer: "A",
    },
    {
      index: 29,
      question: "What is the speed of light?",
      options: [
        { label: "A", answer: "300,000 km/s" },
        { label: "B", answer: "150,000 km/s" },
        { label: "C", answer: "1,000,000 km/s" },
        { label: "D", answer: "3,000 km/s" },
      ],
      correctAnswer: "A",
    },
  ];

  const storedCurrentSelected = localStorage.getItem("currentSelected");
  const storedSelectedOption = localStorage.getItem("selectedOption");
  const storedIsAttempted = localStorage.getItem("isAttempted");
  const storedCurrentIndex = localStorage.getItem("currentIndex");

  const [currentIndex, setCurrentIndex] = useState(
    storedCurrentIndex ? Number(storedCurrentIndex) : 1
  );
  const [selectedOption, setSelectedOption] = useState(
    storedSelectedOption
      ? JSON.parse(storedSelectedOption)
      : new Array(questions.length).fill("")
  );
  const [currentSelected, setCurrentSelected] = useState(
    storedCurrentSelected
      ? JSON.parse(storedCurrentSelected)
      : new Array(questions.length).fill("")
  );
  const [isAttempted, setIsAttempted] = useState(
    storedIsAttempted
      ? JSON.parse(storedIsAttempted)
      : new Array(questions.length).fill("")
  );

  const [isProgressShown, setIsProgressShown] = useState(false);

  const handleNext = () => {
    if (currentIndex < questions.length) {
      const tempCurrentSelected = [...currentSelected];
      tempCurrentSelected[currentIndex - 1] = selectedOption[currentIndex - 1];
      setCurrentSelected(tempCurrentSelected);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const itemRefs = useRef([]);

  const handleSaveNext = () => {
    if (currentIndex < questions.length) {
      setCurrentIndex(currentIndex + 1);
      itemRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 1) {
      const tempCurrentSelected = [...currentSelected];
      tempCurrentSelected[currentIndex - 1] = selectedOption[currentIndex - 1];
      setCurrentSelected(tempCurrentSelected);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentQuestion = questions[currentIndex - 1];

  useEffect(() => {
    localStorage.setItem("currentSelected", JSON.stringify(currentSelected));
    localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
    localStorage.setItem("isAttempted", JSON.stringify(isAttempted));
    localStorage.setItem("currentIndex", currentIndex);
  });

  const [timerComplete, setTimerComplete] = useState(false);

  const handleTimerComplete = () => {
    setTimerComplete(true);
  };

  const showProgress = () => {
    setIsProgressShown(!isProgressShown);
  };

  return (
    <>
      <div className="w-full p-2 md:p-4">
        <div className="w-full md:h-[95vh] bg-[#ddd] rounded-md p-2 md:p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <div
              className={`w-full flex ${
                isProgressShown && "flex-wrap"
              } items-center gap-2 p-2 md:p-4 bg-white rounded-md ${
                !isProgressShown && "overflow-x-auto"
              }`}
            >
              {questions.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center cursor-pointer border-2 border-[#50f]
                  ${
                    isAttempted[item.index - 1] == "attempted" &&
                    "bg-[#2a1] text-white"
                  }  
                  ${
                    isAttempted[item.index - 1] == "skipped" &&
                    "bg-[#f00] text-white"
                  }
                  ${currentIndex == item.index && "bg-[#aaa]"}
                  `}
                  onClick={() => {
                    setCurrentIndex(item.index);
                  }}
                >
                  {item.index}
                </div>
              ))}
            </div>
            <div className="w-fit h-fit hidden p-4 md:flex items-center justify-center bg-white rounded-md">
              <FaBars
                size={20}
                className="cursor-pointer"
                onClick={showProgress}
              />
            </div>
            <div className="w-fit h-fit p-2 md:p-4 bg-white rounded-md flex justify-center items-center">
              {!timerComplete ? (
                <Timer duration={600} onComplete={handleTimerComplete} />
              ) : (
                <h3>Timer Completed!</h3>
              )}
            </div>
          </div>
          <div className=" md:h-[64vh] flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[60%] overflow-auto bg-white rounded-md p-2 md:p-4">
              <div className="">
                {currentQuestion.index}
                {") "}
                {currentQuestion.question}
              </div>
            </div>
            <div className="w-full md:w-[40%] overflow-auto p-2 md:p-4 bg-white rounded-md">
              <div className="flex flex-col items-center gap-4">
                {Object.values(currentQuestion.options).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      const tempCurrentSelected = [...currentSelected];
                      if (
                        tempCurrentSelected[currentIndex - 1] === item.label
                      ) {
                        tempCurrentSelected[currentIndex - 1] = "";
                      } else {
                        tempCurrentSelected[currentIndex - 1] = item.label;
                      }
                      setCurrentSelected(tempCurrentSelected);
                    }}
                    className={`w-full p-2 md:p-4 cursor-pointer rounded-md border-2 border-[#50f] ${
                      currentSelected[currentIndex - 1] === item.label
                        ? "bg-[#50f] text-white"
                        : ""
                    }`}
                  >
                    {"("}
                    {item.label}
                    {") "}
                    {item.answer}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-2 p-2 md:p-4 bg-white rounded-md">
            <div className="md:w-[60%] flex items-center justify-between gap-2 text-xs md:text-base">
              <div
                className="button px-2 md:px-4 py-2"
                onClick={handlePrevious}
              >
                <FaAngleLeft size={20} />
              </div>
              <div className="button px-2 md:px-4 py-2" onClick={handleNext}>
                <FaAngleRight size={20} />
              </div>
            </div>
            <div
              className="button px-4 py-2"
              onClick={() => {
                if (currentSelected[currentIndex - 1] != "") {
                  isAttempted[currentIndex - 1] = "attempted";
                  setIsAttempted(isAttempted);
                } else {
                  isAttempted[currentIndex - 1] = "skipped";
                }
                const tempSelectedOption = [...selectedOption];
                tempSelectedOption[currentIndex - 1] =
                  currentSelected[currentIndex - 1];
                setSelectedOption(tempSelectedOption);
                setCurrentSelected(tempSelectedOption);
                currentIndex != questions.length && handleSaveNext();
              }}
            >
              {currentIndex == questions.length ? "Submit" : "Save & Next"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
