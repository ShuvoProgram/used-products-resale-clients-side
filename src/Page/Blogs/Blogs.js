import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Blogs = () => {
    return (
        <section className="bg-white dark:bg-gray-900 h-full">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>What are the different ways to manage a state in a React application?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        1 . Communication State

                        Communication state forms the backbone of your React Native app without you even knowing about it. Remember when you had requested a call back to an HTTP request? That’s when you introduced the communication system in your app.

                        Communication plays a crucial role in storing information in different states. It covers essential aspects of an application such as loading spinners, error messages, pop-ups, and many others which showcases that a communication link has been formed. Communication state is the “loading phase” of the transactions between different states. It stores the following information when used in a React app:

                        1. The error messages, given that the request failed or the transaction was not completed.

                        2. The type, selector, and expected change of operations requested.

                        3. The type of data requested to access or expect to receive.

                        With the Communication state, you can now access the state of the request without setting any particular command . For example, you can see where your transaction is moving: retrieving, updating, sending, receiving, failed, etc. without having to set any command to determine the true or false value for a request.

                        Communication state is accessible from anywhere using Connect. It can be independently stored and managed by Redux.

                        2. Data State

                        Data state covers information that your React application stores temporarily for various business functions. Supposedly, you are building a project management app. The information stored in the data state will include the following things – project names, contacts, details about the clients, etc.

                        The Data state will receive all the information from the outer world. But how will it identify which information is what and whether it needs to be stored in the data state or not?

                        Well, every piece of information will have an identifier that will help the Data state recognize and request for particular information that it can store.

                        Every fragment of received data has a type and a selector which specifies the kind of data received. You can design a redux store for your data once you have mapped out a way to identify the type and id of a received object.

                        After mapping the type of data and storing relevant information, you can easily access the datastore from anywhere via Connect. Since each state of a React app follows a particular set of rules, you can play around with your information as long as it aligns with the pre-defined rules.

                        For instance, you can change the indexes, custom higher-order components, and do much more with your data state. To receive data from the outer world, you have to request it and then wait until the transaction is failed or completed. This is exactly where the communication state helps.

                        3. Control State

                        Contrary to the state mentioned above in a React app, the control state does not represent the application’s environment. Instead, it refers to the state which the user has input into the app. For example, form inputs, selected items, etc. Control state is known to be more diverse and versatile when it comes to storing information.

                        While form inputs are a huge bundle of information with multiple objects in place, selected items act as a single string of information representing an Id, and the control state efficiently stores both kinds of data without any trouble.

                        However, it follows a rule which only allows components specific to a single screen, or a container to be stored. If you have a state which has a predictable shape like the data or communication and it needs to be readily available throughout the application at any point in time, use Redux. For other states, like the Control state which doesn’t follow a specific pattern of shape and is not required to be present throughout, you can use setState instead of Redux.

                        4. Session State

                        So far, we have discussed the following states:

                        1. Data/ Communication State- Predictable shaped states which are required application-wide

                        2. Control State- Unpredictable shaped states which are not required throughout

                        Now let’s discuss a state which is required to be available throughout the application but has a lesser well-defined shape.

                        Session state contains information about the user of the application such as user id, permissions, passwords, etc. It may also include information on how the application should work according to a particular user’s preferences.

                        While Session state can store similar patterned components like Control state, there is a thick difference between both the information stored. For example, you may have a part of a Control state information that represents parts of a tree view, you can find kind of similar data in the Session state, but it will definitely be different from the Control state.

                        Session states can only be read when a component is mounted, which means that you store a copy of the information already present in the Control state. It stores personal preferences based on the user’s choices to depict the data.

                        5. Location State

                        Location state is the UTF-8 display that appears in your URL bar. In fact, the L in URL stands for Locator! One of the most interesting facts about Location state is that you can give directions to a user to parts of the application that do not have unique URLs associated with them. Also, the HTML5 History API allows you to store states separately from the specific URL.

                        Unlike Data and Communication state, which follow a particular pattern or a shape to store information, location state instead stores information in a simple string like structure. However, one of the most interesting things about location states is that it typically stores URLs in the forms of string-like structures even when they don’t actually represent strings.

                        URLs represent a hierarchy of components, overlaid on one top of the other. One can build a location tree using different URLs that represent different parts of your application.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>How does prototypical inheritance work?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        For instance, we have a user object with its properties and methods, and want to make admin and guest as slightly modified variants of it. We’d like to reuse what we have in user, not copy/reimplement its methods, just build a new object on top of it.

                        Prototypal inheritance is a language feature that helps in that.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>What is a unit test? Why should we write unit tests?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended.

                        Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.

                        Unit testing is a component of test-driven development (TDD), a pragmatic methodology that takes a meticulous approach to building a product by means of continual testing and revision. This testing method is also the first level of software testing, which is performed before other testing methods such as integration testing. Unit tests are typically isolated to ensure a unit does not rely on any external code or functions. Testing can be done manually but is often automated.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>React vs. Angular vs. Vue?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Angular, developed by Google, was first released in 2010, making it the oldest of the lot. It is a TypeScript-based JavaScript framework. A substantial shift occurred in 2016 on the release of Angular 2 (and the dropping of the “JS” from the original name – AngularJS). Angular 2+ is known as just Angular. Although AngularJS (version 1) still gets updates, we will focus the discussion on Angular.



                        vue logo
                        Vue, also known as Vue.js, is the youngest member of the group. It was developed by ex-Google employee Evan You in 2014. Over the last several years, Vue has seen a substantial shift in popularity, even though it doesn’t have the backing of a large company. The most current version is always announced on the official Vue website on their releases page. Contributors for Vue are supported by Patreon. It should be noted that Vue also has its own GitHub repo, and functions using TypeScript.

                        Further reading: Vue.js Tutorial for Beginner Developers



                        react logo
                        React, developed by Facebook, was initially released in 2013. Facebook uses React extensively in their products (Facebook, Instagram, and WhatsApp). Similar to Vue, the React developers also announce their newest version on the blog section of the React website.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </section>
    );
};

export default Blogs;