# Quick Stack with VS Code Kusion

The [VS Code Kusion extension](https://marketplace.visualstudio.com/items?itemName=KusionStack.kusion) provides convenient operations to deliver KCL configurations to Clouds.

## Set Up Your Environment

-   **Step 1.** Install Kusion on your system.
-   **Step 2.** Install the Kusion extension for Visual Studio Code. This extension requires the VS Code 1.68+

## Get Started to Deliver Your First App

Here's an example for you to quickly get started to deliver [code city](https://wettel.github.io/codecity.html) application to the clouds with the VS Code Kusion Extension. All the steps could be interactivly experienced in the `Getting started with Kusion` walkthrough within VS Code.

To find the Kusion walkthrough: Open the Command Palatte > type and select `Welcome: Open Walkthrough...` > then type and select `kusion`.


1. **Abstract: Define Your Models**
    For quick start, A monorepo [konfig](https://github.com/KusionStack/konfig) is already there, which contains classical atractions of application configuration and jobs, etc. We could directly clone the repo and open it with VS Code: 
    
    ```
    git clone https://github.com/KusionStack/konfig.git
    ```

2. **Config: New Kusion Project**

    We could quickly create a new kusion project from archetype. To do that, click the `Create Kusion Project` button on the walkthrough (or, type `Kusion: Create` in the Command Palatte), and select a project template(For example using the `code-city` template we could deploy an application to visualize software as 3D cities).

    ![](/img/docs/user_docs/getting-started/create-project.gif)

3. **Preview**

    Now let's preview the yaml representation of our Config previously created by clicking the data preview button or type and select `Kusion: Open Data Preview To the Side`.
    
    ![](/img/docs/user_docs/getting-started/preview-data.gif)

4. **Runtime Diff and Go online**
    
    After changing the stack's configuration, we can right-click at the configuraion main file and select `Preview Live Diff and Apply` to open the Runtime Diff page.

    Then we could confirm the diff and make the changes go online.

    ![](/img/docs/user_docs/getting-started/config-diff-apply.gif)
    
