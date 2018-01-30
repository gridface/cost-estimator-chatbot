# DHP Cost Estimator Chatbot

This project uses the Microsoft Bot Framework to create a simple chatbot that provides members with a cost estimate of a procedure at a given practice location.  

The design is based on the MBF Simple Task Automation and follows a waterfall dialog approach to its conversational interface (CUI).

Waterfalls let you collect input from a user using a sequence of steps. A bot is always in a state of providing a user with information or asking a question and then waiting for input. In the Node version of Bot Builder it's waterfalls that drive this back-n-forth flow.  

The conversation is deployed as a REST service to be consumed by multiple channels (Skype, Webform, SMS, etc), and consumes other REST services for gathering information related to practice locations, medical procedures, and benefit plans. 

This is a demo project to be used for presentations and does not include access to any live enterprise services.
