# Codex Collective Website

This project is the official website for the Codex Collective, a music collective based in Santiago de Compostela. The website is designed to provide information about the collective, showcase upcoming events, and feature news updates. The client required a CMS to manage the content dynamically, which has been implemented using Strapi.

## Technologies Used

- React: A JavaScript library for building user interfaces. This project utilizes React to handle the frontend rendering and state management.
- Strapi: An open-source headless CMS that is used to manage and deliver the content across the platform. Strapi is used here to manage events, updates, and other dynamic content of the website.
- Tailwind CSS: A utility-first CSS framework used for styling the website. It helps in building custom designs without leaving the HTML.
- Framer Motion: A popular library to add animations to React applications, used to enhance the interactivity and visual appeal of the website.

## Project Status

The project is currently in the development phase. The main functionalities, such as event management and content updates via Strapi, are set up and in testing.

## Local Development

To run this project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/your-github-username/codex-collective-site.git
   cd codex-collective-site

2. Install dependencies:
   - For the frontend:
     cd frontend
     npm install
     npm run dev

   - For the backend (Strapi):
     cd backend
     npm install
     npm run develop

3. Environment Variables:
   - Ensure to set up the necessary environment variables in .env files in both the frontend and backend directories as required.

4. Running the application:
   - Frontend will be accessible at http://localhost:3000/
   - Backend (Strapi admin panel) will be accessible at http://localhost:1337/admin

## Contributing

We welcome contributions to the Codex Collective Website. If you are interested in contributing, please read our contributing guidelines in CONTRIBUTING.md (to be created), and feel free to submit pull requests or issues.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.