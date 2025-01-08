# FinTrack
## Introduction
FinTrack is a comprehensive finance tracker API designed to assist users in:

1. Planning budgets.
2. Managing expenses.
3. Track your savings.
4. Generating detailed financial reports.
5. Keep track of your income sources.


With FinTrack, users can gain better control over their financial health by tracking income, monitoring spending habits, and setting financial goals. This powerful tool aims to simplify personal finance management and provide valuable insights for making informed financial decisions.

## Features

- **User Authentication**: Secure login and registration system to protect user data.
- **Budget Planning**: Tools to create and manage budgets effectively.
- **Savings Tracking**: Monitor and categorize all savings activities.
- **Income Management**: Track multiple income sources.
- **Financial Reports**: Generate detailed reports to analyze financial health.
- **Goal Setting**: Set and track financial goals.

## Installation

To install and run FinTrack locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Mark-andrew7/fintrack.git
    ```
2. Navigate to the project directory:
    ```bash
    cd fintrack
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm start
    ```

## Usage

After starting the server, you can access the API at `http://localhost:3000`. Use tools like Postman to interact with the endpoints.

## API Endpoints

| Method | Endpoint             | Description                   |
|--------|----------------------|-------------------------------|
| POST   | /register            | Register a new user           |
| POST   | /api/token           | Login in a new user
| POST   | /auth-register       | Authenticate a user           |
| GET    | /budgets             | Retrieve user budgets         |
| POST   | /budgets             | Create a new budget           |
| GET    | /expenses            | Retrieve user expenses        |
| POST   | /incomes             | Add a new income              |
| POST   | /expenses            | Add a new expense             |
| GET    | /financial-report    | Generate financial reports    |

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Description of changes"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach us at:
- Mark Kamau     -  [GitHub](https://github.com/Mark-andrew7)
- Winfred Mbinya -  [GitHub](https://github.com/WINNIE-MBINYA)
- Jude Kimathi   -  [GitHub](https://github.com/jxkimathi)
- Joseph Njoroge -  [GitHub](https://github.com/JosephNjorog)

Project URL - https://roadmap.sh/projects/expense-tracker-api
