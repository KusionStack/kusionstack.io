# Quick Stack with VS Code Kusion

The [VS Code Kusion extension](https://marketplace.visualstudio.com/items?itemName=KusionStack.kusion) provides convenient operations to deliver KCL configurations to Clouds.

## Set Up Your Environment

-   **Step 1.** Install Kusion on your system.
-   **Step 2.** Install the Kusion extension for Visual Studio Code. This extension requires the VS Code 1.68+

## Get Started to Deliver Your First App

Here's an example for you to quickly get started to deliver [code city](https://wettel.github.io/codecity.html) application to the clouds with the VS Code Kusion Extension. All the steps could be interactivly experienced in the `Getting started with Kusion` walkthrough within VS Code.

To find the Kusion walkthrough: Open the Command Palatte > type and select `Welcome: Open Walkthrough...` > then type and select `kusion`.


1. **Open a Konfig Workspace Folder**
    A monorepo [konfig](https://github.com/KusionStack/konfig) is already there for quick start, we could clone the repo and open it with VS Code: 
    ```
    git clone https://github.com/KusionStack/konfig.git
    ```

2. **Create a New Kusion Project**

    We could quickly create a new kusion project from archetype. To do that, click the `Create Kusion Project` button on the walkthrough (or, type `Kusion: Create` in the Command Palatte), and select a project template(For example using the `code-city` template we could deploy an application to visualize software as 3D cities).

    ![](/img/docs/user_docs/getting-started/create-project.gif)

3. **Explore Your Project and Configurations**
    Now let's open our kusion project that we previously created and browse the configuration code

4. **Verify the Resource Changes to be made**

    After changing the stack's configuration, we can right-click at the configuraion main file and select `Preview Live Diff and Apply` to verify the resource changes to be made. And 

5. **Apply the Application Changes**
    Then if the live diff is as expected, we apply the changes to the runtime by clicking the 'Apply' button to confirm to apply.

    ![](/img/docs/user_docs/getting-started/config-diff-apply.gif)
