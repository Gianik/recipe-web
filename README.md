<!-- A recipe web app built using nextjs , tailwind css and pocketbase. -->
# Recipe Web Project

___
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#reason-for">Reason for</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-sample">API Sample</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



## About The Project

This is a simple crud web project that creates, display , edit and delete recipes as well as users (admin only). This web project consists of a mixture of both server side componets and client side components.

Features:

* Create,Read,Update and Delete Recipes.
* Create,Read,Update and Delete Users (Admin Only).
* Login and Registration.
* Basic Authentication.
* Mobile Responsive.

This project is just a simple project designed to have a javascript framework work with a light database like pocketbase.
It is also using the experimental nextjs 13 new app directory where by default all pages are server side unless stated to be client.

Thank you.

<p align="left">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project is built with using the following technologies:

* [![Next][Next.js]][Next-url]
* [![Pocketbase][PocketBase]][Pocketbase-url]
* [![TailwindCSS][Tailwind CSS]][Tailwind CSS-url]

<p align="left">(<a href="#readme-top">back to top</a>)</p>

### Reason for
  
The reason for choosing the technologies mentioned above is that I want to use nextjs a react framework with tailwind css and pocketbase a self host database server to have fast and light project.

<p align="left">(<a href="#readme-top">back to top</a>)</p>
### Prerequisites

The prerequisites for this project:

  ```sh
  Node.js 14.6.0 or higher
  ```

<p align="left">(<a href="#readme-top">back to top</a>)</p>

### Installation

1. Clone the Github repsitory
2. 
   ```sh
    git clone https://github.com/Gianik/recipe-web.git
   ```

3. Install NPM packages

   ```sh
   npm install || npm i
   ```

4. Start Pocketbase
   ```sh
   ./Pocketbase serve
   ```
5. Enter the Pocketbase link `.env.local`
   ```js
   PB_LINK = 'your pocketbase link'  
   Sample:'http://127.0.0.1:8090'
    ```

<p align="left">(<a href="#readme-top">back to top</a>)</p>

### Usage

Sample Use Cases will be placed here along with a short explanation.

<p align="left">(<a href="#readme-top">back to top</a>)</p>

### API Sample

Sample of the API used and a short explanation will be provided here.

<p align="left">(<a href="#readme-top">back to top</a>)</p>

### Contacts

My Email: paoloduguran@gmail.com

Project Repository: [https://github.com/Gianik/recipe-web.git](https://github.com/Gianik/recipe-web.git)

<p align="left">(<a href="#readme-top">back to top</a>)</p>



<!-- Markdown Links and images -->
[PocketBase]:https://img.shields.io/static/v1?style=for-the-badge&message=PocketBase&color=222222&logo=PocketBase&logoColor=B8DBE4&label=
[PocketBase-url]: https://pocketbase.io/

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[Tailwind CSS]:https://img.shields.io/static/v1?style=for-the-badge&message=Tailwind+CSS&color=222222&logo=Tailwind+CSS&logoColor=06B6D4&label=
[Tailwind CSS-url]:https://tailwindcss.com/

[Headless UI]:(https://img.shields.io/static/v1?style=for-the-badge&message=Headless+UI&color=222222&logo=Headless+UI&logoColor=66E3FF&label=)