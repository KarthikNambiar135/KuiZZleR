export const getFallbackQuestions = () => {
  const allQuestions = {
    "General Knowledge": [
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["London", "Berlin", "Madrid"]
      },
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "What is the largest ocean on Earth?",
        correct_answer: "Pacific Ocean",
        incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]
      },
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "How many continents are there?",
        correct_answer: "7",
        incorrect_answers: ["5", "6", "8"]
      },
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "medium",
        question: "What is the hardest natural substance on Earth?",
        correct_answer: "Diamond",
        incorrect_answers: ["Gold", "Iron", "Quartz"]
      },
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "medium",
        question: "Which country has the most time zones?",
        correct_answer: "France",
        incorrect_answers: ["Russia", "United States", "China"]
      },
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "hard",
        question: "What is the smallest bone in the human body?",
        correct_answer: "Stapes",
        incorrect_answers: ["Femur", "Tibia", "Radius"]
      }
    ],
    "Science": [
      {
        category: "Science",
        type: "multiple",
        difficulty: "easy",
        question: "What is the chemical symbol for gold?",
        correct_answer: "Au",
        incorrect_answers: ["Go", "Gd", "Ag"]
      },
      {
        category: "Science",
        type: "multiple",
        difficulty: "easy",
        question: "How many bones are there in an adult human body?",
        correct_answer: "206",
        incorrect_answers: ["205", "207", "204"]
      },
      {
        category: "Science",
        type: "multiple",
        difficulty: "easy",
        question: "What gas do plants absorb from the atmosphere?",
        correct_answer: "Carbon Dioxide",
        incorrect_answers: ["Oxygen", "Nitrogen", "Hydrogen"]
      },
      {
        category: "Science",
        type: "multiple",
        difficulty: "medium",
        question: "What is the chemical formula for water?",
        correct_answer: "H2O",
        incorrect_answers: ["H3O", "HO2", "H2O2"]
      },
      {
        category: "Science",
        type: "multiple",
        difficulty: "medium",
        question: "Which organ produces insulin?",
        correct_answer: "Pancreas",
        incorrect_answers: ["Liver", "Kidney", "Heart"]
      },
      {
        category: "Science",
        type: "multiple",
        difficulty: "hard",
        question: "What is the speed of light in vacuum?",
        correct_answer: "299,792,458 m/s",
        incorrect_answers: ["300,000,000 m/s", "299,792,459 m/s", "298,792,458 m/s"]
      }
    ],
    "Geography": [
      {
        category: "Geography",
        type: "multiple",
        difficulty: "easy",
        question: "Which planet is known as the Red Planet?",
        correct_answer: "Mars",
        incorrect_answers: ["Venus", "Jupiter", "Saturn"]
      },
      {
        category: "Geography",
        type: "multiple",
        difficulty: "easy",
        question: "What is the capital of Australia?",
        correct_answer: "Canberra",
        incorrect_answers: ["Sydney", "Melbourne", "Perth"]
      },
      {
        category: "Geography",
        type: "multiple",
        difficulty: "medium",
        question: "What is the smallest country in the world?",
        correct_answer: "Vatican City",
        incorrect_answers: ["Monaco", "San Marino", "Liechtenstein"]
      },
      {
        category: "Geography",
        type: "multiple",
        difficulty: "medium",
        question: "Which river is the longest in the world?",
        correct_answer: "Nile River",
        incorrect_answers: ["Amazon River", "Mississippi River", "Yangtze River"]
      },
      {
        category: "Geography",
        type: "multiple",
        difficulty: "hard",
        question: "What is the deepest point in Earth's oceans?",
        correct_answer: "Mariana Trench",
        incorrect_answers: ["Puerto Rico Trench", "Java Trench", "Philippine Trench"]
      },
      {
        category: "Geography",
        type: "multiple",
        difficulty: "hard",
        question: "Which country has the most natural lakes?",
        correct_answer: "Canada",
        incorrect_answers: ["Finland", "Norway", "Sweden"]
      }
    ],
    "History": [
      {
        category: "History",
        type: "multiple",
        difficulty: "easy",
        question: "In which year did World War II end?",
        correct_answer: "1945",
        incorrect_answers: ["1944", "1946", "1943"]
      },
      {
        category: "History",
        type: "multiple",
        difficulty: "easy",
        question: "Who was the first President of the United States?",
        correct_answer: "George Washington",
        incorrect_answers: ["Thomas Jefferson", "John Adams", "Benjamin Franklin"]
      },
      {
        category: "History",
        type: "multiple",
        difficulty: "medium",
        question: "The Berlin Wall fell in which year?",
        correct_answer: "1989",
        incorrect_answers: ["1987", "1991", "1985"]
      },
      {
        category: "History",
        type: "multiple",
        difficulty: "medium",
        question: "Which empire was ruled by Julius Caesar?",
        correct_answer: "Roman Empire",
        incorrect_answers: ["Greek Empire", "Persian Empire", "Egyptian Empire"]
      },
      {
        category: "History",
        type: "multiple",
        difficulty: "hard",
        question: "The Treaty of Versailles was signed in which year?",
        correct_answer: "1919",
        incorrect_answers: ["1918", "1920", "1917"]
      },
      {
        category: "History",
        type: "multiple",
        difficulty: "hard",
        question: "Who was the last Pharaoh of Ancient Egypt?",
        correct_answer: "Cleopatra VII",
        incorrect_answers: ["Nefertiti", "Hatshepsut", "Ankhesenamun"]
      }
    ],
    "Sports": [
      {
        category: "Sports",
        type: "multiple",
        difficulty: "easy",
        question: "How many players are there in a basketball team on court at one time?",
        correct_answer: "5",
        incorrect_answers: ["6", "7", "4"]
      },
      {
        category: "Sports",
        type: "multiple",
        difficulty: "easy",
        question: "How often are the Summer Olympics held?",
        correct_answer: "Every 4 years",
        incorrect_answers: ["Every 2 years", "Every 3 years", "Every 5 years"]
      },
      {
        category: "Sports",
        type: "multiple",
        difficulty: "medium",
        question: "In which sport would you perform a slam dunk?",
        correct_answer: "Basketball",
        incorrect_answers: ["Volleyball", "Tennis", "Baseball"]
      },
      {
        category: "Sports",
        type: "multiple",
        difficulty: "medium",
        question: "How many holes are there in a full round of golf?",
        correct_answer: "18",
        incorrect_answers: ["16", "20", "22"]
      },
      {
        category: "Sports",
        type: "multiple",
        difficulty: "hard",
        question: "Which country hosted the first FIFA World Cup?",
        correct_answer: "Uruguay",
        incorrect_answers: ["Brazil", "Argentina", "Italy"]
      },
      {
        category: "Sports",
        type: "multiple",
        difficulty: "hard",
        question: "What is the maximum score possible in ten-pin bowling?",
        correct_answer: "300",
        incorrect_answers: ["250", "280", "320"]
      }
    ],
    "Movies": [
      {
        category: "Movies",
        type: "multiple",
        difficulty: "easy",
        question: "Who directed the movie 'Jurassic Park'?",
        correct_answer: "Steven Spielberg",
        incorrect_answers: ["George Lucas", "James Cameron", "Tim Burton"]
      },
      {
        category: "Movies",
        type: "multiple",
        difficulty: "easy",
        question: "Which movie features the line 'May the Force be with you'?",
        correct_answer: "Star Wars",
        incorrect_answers: ["Star Trek", "Guardians of the Galaxy", "Interstellar"]
      },
      {
        category: "Movies",
        type: "multiple",
        difficulty: "medium",
        question: "What is the highest-grossing film of all time?",
        correct_answer: "Avatar (2009)",
        incorrect_answers: ["Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"]
      },
      {
        category: "Movies",
        type: "multiple",
        difficulty: "medium",
        question: "Which actor played the Joker in 'The Dark Knight'?",
        correct_answer: "Heath Ledger",
        incorrect_answers: ["Joaquin Phoenix", "Jack Nicholson", "Jared Leto"]
      },
      {
        category: "Movies",
        type: "multiple",
        difficulty: "hard",
        question: "Which film won the Academy Award for Best Picture in 1994?",
        correct_answer: "Forrest Gump",
        incorrect_answers: ["The Shawshank Redemption", "Pulp Fiction", "The Lion King"]
      },
      {
        category: "Movies",
        type: "multiple",
        difficulty: "hard",
        question: "Who composed the music for 'The Lord of the Rings' trilogy?",
        correct_answer: "Howard Shore",
        incorrect_answers: ["John Williams", "Hans Zimmer", "Danny Elfman"]
      }
    ]
  };

  return allQuestions;
};

export const getRandomFallbackQuestions = (category = null, difficulty = null) => {
  const allQuestions = getFallbackQuestions();
  let questionPool = [];

  // If specific category is requested
  if (category && allQuestions[category]) {
    questionPool = [...allQuestions[category]];
  } else {
    // Mix questions from all categories
    Object.values(allQuestions).forEach(categoryQuestions => {
      questionPool.push(...categoryQuestions);
    });
  }

  // Filter by difficulty if specified
  if (difficulty && difficulty !== 'any') {
    questionPool = questionPool.filter(q => q.difficulty === difficulty);
  }

  // Shuffle the questions
  const shuffled = questionPool.sort(() => Math.random() - 0.5);
  
  // Return 10 random questions (or all if less than 10)
  return shuffled.slice(0, Math.min(10, shuffled.length));
};
