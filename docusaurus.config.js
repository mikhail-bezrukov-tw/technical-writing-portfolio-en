const config = {
  title: 'Mikhail Bezrukov',
  tagline: 'Senior Technical Writer',
  url: 'https://mikhail-bezrukov-tw.github.io',
  baseUrl: '/technical-writing-portfolio-en/',
  organizationName: 'mikhail-bezrukov-tw',
  projectName: 'technical-writing-portfolio-en',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    ['classic', {
      docs: false,
      blog: false,
      theme: {customCss: require.resolve('./src/css/custom.css')},
    }],
  ],
  themeConfig: {
    navbar: {
      title: 'Mikhail Bezrukov',
      items: [
        {to:'/writing-samples/today-patients', label:'Product sample', position:'right'},
        {to:'/case-studies/ai-screenshot-workflow', label:'AI workflow', position:'right'},
        {to:'/case-studies/docs-linter', label:'Docs tooling', position:'right'},
        {to:'/about', label:'About', position:'right'},
        {href:'https://mikhail-bezrukov-tw.github.io/technical-writing-portfolio-en/mikhail-bezrukov-cv.pdf', label:'Resume', position:'right'},
      ],
    },
    footer: {
      style:'light',
      copyright:'Mikhail Bezrukov · Senior Technical Writer',
    },
  },
};
module.exports = config;
