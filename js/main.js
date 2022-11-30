const POST_TOPIC_SELECTOR = '%post_topic%';
const POST_TITLE_SELECTOR = '%post_title%';
const POST_IMAGE_SELECTOR = '%image_href%';
const AUTHOR_LINK_SELECTOR = '%author_href%';
const AUTHOR_NAME_SELECTOR = '%author%';
const POST_TIMEDATE_HUMAN_READABLE_SELECTOR = /%human_date%/g;
const POST_TIMEDATE_SELECTOR = '%datetime%';
const POST_CATEGORY_SELECTOR = '%category%';

const getHumanReadableDate = (date) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en-uk', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return dateTimeFormat.format(date);
}

getPostTopic = (post) => {
    // I took this approach to not have different card styles when the topic is not available
    return post?._embedded["wp:term"]?.[2]?.[0]?.name || "General news";
}

getPostCategory = (post) => {
    return post?._embedded["wp:term"]?.[0]?.[0]?.name;
}

const insertContentIntoTemplate = (post, template, container) => {
    template.innerHTML = template.innerHTML.replace(POST_TOPIC_SELECTOR, getPostTopic(post));
    template.innerHTML = template.innerHTML.replace(POST_TITLE_SELECTOR, post.title.rendered);
    template.innerHTML = template.innerHTML.replace(POST_IMAGE_SELECTOR, post.featured_media);
    template.innerHTML = template.innerHTML.replace(AUTHOR_LINK_SELECTOR, post._embedded.author[0].link);
    template.innerHTML = template.innerHTML.replace(AUTHOR_NAME_SELECTOR, post._embedded.author[0].name);
    template.innerHTML = template.innerHTML.replace(POST_TIMEDATE_HUMAN_READABLE_SELECTOR, getHumanReadableDate(new Date(post.date)));
    template.innerHTML = template.innerHTML.replace(POST_TIMEDATE_SELECTOR, post.date);
    template.innerHTML = template.innerHTML.replace(POST_CATEGORY_SELECTOR, getPostCategory(post));

    container.appendChild(template);
}

const init = async () => {
    const response = await fetch("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json");
    const posts = await response.json();

    posts.forEach(post => {
        createCardFromPostContent(post);
    });
}

const createCardFromPostContent = post => {
    const container = document.getElementById("cards");
    const template = document.getElementById("card-template");

    const firstClone = template.content.cloneNode(true);
    const secondClone = template.content.firstElementChild.cloneNode(true); // Needed because of: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#avoiding_documentfragment_pitfall

    insertContentIntoTemplate(post, secondClone, container);
}

init();
