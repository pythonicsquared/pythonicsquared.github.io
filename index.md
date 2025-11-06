---
permalink: /
layout: home
---
{% assign entries = site.entries | sort: "date" | reverse | where_exp: "item", "item.featured != true" %}
{% assign featured = site.entries | where: "featured", true | first %}
<ul class="entry-list">
  {% if featured %}
  <li>
    <h2><a href="{{ featured.url | relative_url }}">{{ featured.title }}</a></h2>
    <p>{{ featured.description | default: featured.excerpt }}</p>
  </li>
  {% endif %}
  {% for entry in entries %}
    {% unless entry.path contains 'index.md' %}
      <li>
        <h2><a href="{{ essay.url | relative_url }}">{{ entry.title }}</a></h2>
        <p>{{ entry.description | default: entry.excerpt }}</p>
      </li>
    {% endunless %}
  {% endfor %}
</ul>
