---
title: How to Search
---
Within this section, we will explore how to perform multi-cluster resource searches using Karpor, with this guide being done entirely through the Web UI.

We support two methods of search:

- **Search by SQL**: Perform resource searches using SQL query language.
- **Search by DSL**: Conduct resource searches through `Karpor`'s Domain Specific Language (DSL).

## Search by SQL

Karpor offers a nifty SQL query feature that allows you to search and filter all Kubernetes resources within managed clusters using familiar SQL syntax and provides targeted optimizations and enhancements for multi-cluster resource searches.

SQL is one of the easily accessible skills for practitioners in the software engineering industry, theoretically making the learning curve quite low. As such, this search method is prepared for you! It is particularly well-suited for beginners to Karpor.

Below are the steps to use Search by SQL:

1. **Enter the Search page**: We designed the homepage as the entry point for search, so opening `Karpor`'s Web UI immediately presents you with the search page.
   ![](/karpor/assets/search/search-home.png)

2. **Compose SQL query statements**: Write your query statement using SQL syntax, specifying the cluster name, resource type, conditions, and filters you wish to search for. Additionally, if you enter a keyword and press a space, the search box will pop up with a dropdown with auto-completion, suggesting possible keywords you can type next.
   ![](/karpor/assets/search/search-auto-complete.png)

3. **Execute the query**: Click the 'search' button to execute the query and be sent to the search results page. Karpor will return a list of resources that match the SQL query.
   ![](/karpor/assets/search/search-result.png)

4. **Advanced features**: Utilize our built-in advanced SQL syntax, such as sorting, full-text search, etc., to refine your search further. For details, please refer to: [Search Methodology Documentation](../5-references/3-search-methods.md).

## Search by SQL

Coming soon. 🚧
