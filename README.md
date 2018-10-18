<h1 align="center" style="color:rgb(22, 12, 41); font-weight: bold;">
  Judge
</h1>
<p align="center" style="color:rgb(22, 12, 41);" >
  A judgmental generative results prospector.
</p>

Judge helps you generate static visualizations for generative algorithm results such as Style Transfer, Filters, etc.

## 🚀 Quick start

1.  **Install the Gatsby CLI.**

    The Gatsby CLI helps you create new sites using Gatsby starters (like this one!)

    ```sh
    # install the Gatsby CLI globally
    npm install -g gatsby-cli
    ```

2.  **Install required prerequisites.**

    Use `npm` in order to install relevant project prerequisites by running the following command in the project's directory

    ```sh
    npm install
    # OR
    yarn install
    ```

3.  **Configure your results location.**

    In the file `gatsby-config.js`, see the following lines:
    ```js
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `rounds`,
      path: `${__dirname}/data/`
    }
    ```
    Now change the `path` parameter to point your results root directory.

    > Note: Further details on results directory structure and naming conventions are in the next section.

4.  **Start the development server.**

    Now, in the site’s directory, start up the development server.

    ```sh
    gatsby develop
    ```

## 🧐 Results directory structure

A quick look at the top-level directories you'll see in a Judge results directory.

```bash
.
├── experiment_1
│   ├── conclusions.md
│   ├── contents
│   ├── results
│   └── styles
├── experiment_2
│   ├── conclusions.md
│   ├── contents
│   ├── results
│   └── styles
└── experiment_3
    ├── contents
    ├── results
    └── styles
 ```

  1. **Head Directories**: Are the experiment names, delimited by underscores. This is intended in order to maintain both URL and UNIX name legalities.  

  2. **Contents Directories**: Include the content images used for the experiment(i.e for style transfer those would be the pre-transformed images).
  > Naming *could* follow `content-image_001.jpg`

  3. **Styles Directories**: Are the images used as examples/styles/kernels for the algorithm, these are usually the parameter images.
  > Naming *could* follow `style-image.png`

  4. **Results Directories**: These are the final output of the algorithm.
  > Depending on the previous 2 examples, naming **should** be `content-image_001~style-image.png`

  5. **Markdown Document**: Including a markdown file *in a results directory* would render it at the head of the result page.

## 💫 Deploy

In order to build the project, run the following command in the project's root directory:

```bash
gatsby build
```

## Authors

* **Shaked Lokits** - *Initial work and Maintainer* - [shakedlokits](https://github.com/shakedlokits)

## License

This project is licensed under the GPL v3 - see the [LICENSE.md](./LICENSE.md) file for details
