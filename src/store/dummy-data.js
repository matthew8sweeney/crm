const dummyData = {
  leads: {
    l1: {
      name: "Lead No. 1",
      latestAction: "Email - 1:40 PM",
      website: "www.lead1.com",
      address: "123 Some Lane",
      industry: "Some industry",
      stage: "Negotiations",
      interactions: [
        {
          actionType: "Interaction",
          interactionType: "Email",
          subject: "Lead 1 Email 1",
          timeSent: new Date().toISOString(),
        },
        {
          actionType: "Interaction",
          interactionType: "Email",
          subject: "Lead 1 Email 2",
          time: new Date(0).toISOString(),
        },
        {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date().toISOString(),
          subject: "Notes regarding call with lead 1",
        },
        {
          actionType: "Interaction",
          interactionType: "Phone Call",
          timeMade: new Date(0).toISOString(),
          subject: "More notes regarding another call with lead 1",
        },
      ],

      tasks: [
        {
          actionType: "Task",
          title: "Lead 1 Task 1",
          taskTypeId: 0,
          taskType: "Do something",
          timeDue: new Date().toISOString(),
        },
        {
          actionType: "Task",
          title: "Lead 1 Task 2",
          typeId: 1,
          taskType: "Do something else",
          timeDue: new Date(0).toISOString(),
        },
      ],
      notes: [
        {
          actionType: "Note",
          title: "Lead 1 Note 1",
          text: "[Note regarding lead 1]",
        },
        {
          actionType: "Note",
          title: "Lead 1 Note 2",
          text: "[Another note regarding lead 1]",
        },
      ],
    },
    l2: {
      name: "Lead No. 2",
      latestAction: "Call - 1:30 PM",
      website: "www.lead2.com",
      address: "456 Some Street",
      industry: "Some other industry",
      interactions: [
        {
          actionType: "Interaction",
          interactionType: "Email",
          subject: "Lead 2 Email 1",
          timeSent: new Date().toISOString(),
        },
        {
          actionType: "Interaction",
          interactionType: "Email",
          subject: "Lead 2 Email 2",
          time: new Date(0).toISOString(),
        },
        {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date().toISOString(),
          subject: "Notes regarding call with lead 2",
        },
        {
          actionType: "Interaction",
          interactionType: "Phone Call",
          timeMade: new Date(0).toISOString(),
          subject: "More notes regarding another call with lead 2",
        },
      ],

      tasks: [],
      notes: [
        {
          actionType: "Note",
          title: "Lead 2 Note 1",
          text: "Note regarding lead 2.  This one is extra long in order to demonstrate the effects of having a note length greater than one single line of text",
        },
        {
          actionType: "Note",
          title: "Lead 2 Note 2",
          text: "[Another note regarding lead 2]",
        },
      ],
    },
  },

  accounts: {
    a1: {
      name: "Account No. 1",
      latestAction: "Email - 1:20 PM",
      website: "www.account1.com",
      address: "789 Some Ave",
      industry: "Some industry",
      interactions: [
        {
          actionType: "Interaction",
          interactionType: "Email",
          subject: "Account 1 Email 1",
          timeSent: new Date().toISOString(),
        },
        {
          actionType: "Interaction",
          interactionType: "Email",
          subject: "Account 1 Email 2",
          time: new Date(0).toISOString(),
        },
        {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date().toISOString(),
          subject: "Notes regarding call with account 1",
        },
        {
          actionType: "Interaction",
          interactionType: "Phone Call",
          timeMade: new Date(0).toISOString(),
          subject: "More notes regarding another call with account 1",
        },
      ],

      tasks: [
        {
          actionType: "Task",
          title: "Account 1 Task 1",
          taskTypeId: 0,
          taskType: "Do something",
          timeDue: new Date(0).toISOString(),
        },
        {
          actionType: "Task",
          title: "Account 1 Task 2",
          typeId: 1,
          taskType: "Do something else",
        },
      ],
      notes: [
        {
          actionType: "Note",
          title: "Account 1 Note 1",
          text: "[Note regarding account 1]",
        },
        {
          actionType: "Note",
          title: "Account 1 Note 2",
          text: "[Another note regarding account 1]",
        },
      ],
    },
    a2: {
      name: "Account No. 2",
      latestAction: "Note - 11:40 AM",
      website: "www.account2.com",
      address: "102 Some Parkway",
      industry: "Some other industry",
      interactions: [
        {
          actionType: "Interaction",
          interactionType: "Email",
          subject: "Account 2 Email 1",
          timeSent: new Date().toISOString(),
        },
        {
          actionType: "Interaction",
          interactionType: "Email",
          subject: "Account 2 Email 2",
          time: new Date(0).toISOString(),
        },
        {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date().toISOString(),
          subject: "Notes regarding call with account 2",
        },
        {
          actionType: "Interaction",
          interactionType: "Phone Call",
          timeMade: new Date(0).toISOString(),
          subject: "More notes regarding another call with account 2",
        },
      ],

      tasks: [
        {
          actionType: "Task",
          title: "Account 2 Task 1",
          taskTypeId: 0,
          taskType: "Do something",
          timeDue: new Date().toISOString(),
        },
        {
          actionType: "Task",
          title: "Account 2 Task 2",
          typeId: 1,
          taskType: "Do something else",
          timeDue: new Date(0).toISOString(),
        },
      ],
      notes: [
        {
          actionType: "Note",
          title: "Account 2 Note 1",
          text: "[Note regarding account 2]",
        },
        {
          actionType: "Note",
          title: "Account 2 Note 2",
          text: "[Another note regarding account 2]",
        },
      ],
    },
  },
};

export default dummyData;
