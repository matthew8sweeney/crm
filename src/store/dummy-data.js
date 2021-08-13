const dummyData = {
  leads: {
    l1: {
      name: "Lead No. 1",
      latestAction: "Email - 1:40 PM",
      website: "www.lead1.com",
      address: "123 Some Lane",
      industry: "Some industry",
      stage: "Negotiations",
      interactions: {
        id1: {
          actionType: "Interaction",
          interactionType: "Email",
          description: "Lead 1 Email 1",
          time: new Date().toISOString(),
        },
        id2: {
          actionType: "Interaction",
          interactionType: "Email",
          description: "Lead 1 Email 2",
          time: new Date(0).toISOString(),
        },
        id3: {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date().toISOString(),
          description: "Notes regarding call with lead 1",
        },
        id4: {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date(0).toISOString(),
          description: "More notes regarding another call with lead 1",
        },
      },

      tasks: {
        t1: {
          actionType: "Task",
          title: "Lead 1 Task 1",
          taskTypeId: 0,
          taskType: "Do something",
          timeDue: new Date().toISOString(),
        },
        t2: {
          actionType: "Task",
          title: "Lead 1 Task 2",
          typeId: 1,
          taskType: "Do something else",
          timeDue: new Date(0).toISOString(),
        },
      },
      notes: {
        n1: {
          actionType: "Note",
          title: "Lead 1 Note 1",
          text: "[Note regarding lead 1]",
        },
        n2: {
          actionType: "Note",
          title: "Lead 1 Note 2",
          text: "[Another note regarding lead 1]",
        },
      },
    },
    l2: {
      name: "Lead No. 2",
      latestAction: "Call - 1:30 PM",
      website: "www.lead2.com",
      address: "456 Some Street",
      industry: "Some other industry",
      interactions: {
        i1: {
          actionType: "Interaction",
          interactionType: "Email",
          description: "Lead 2 Email 1",
          time: new Date().toISOString(),
        },
        i2: {
          actionType: "Interaction",
          interactionType: "Email",
          description: "Lead 2 Email 2",
          time: new Date(0).toISOString(),
        },
        i3: {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date().toISOString(),
          description: "Notes regarding call with lead 2",
        },
        i4: {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date(0).toISOString(),
          description: "More notes regarding another call with lead 2",
        },
      },
      tasks: {},
      notes: {
        n1: {
          actionType: "Note",
          title: "Lead 2 Note 1",
          text: "Note regarding lead 2.  This one is extra long in order to demonstrate the effects of having a note length greater than one single line of text",
        },
        n2: {
          actionType: "Note",
          title: "Lead 2 Note 2",
          text: "[Another note regarding lead 2]",
        },
      },
    },
  },

  accounts: {
    a1: {
      name: "Account No. 1",
      latestAction: "Email - 1:20 PM",
      website: "www.account1.com",
      address: "789 Some Ave",
      industry: "Some industry",
      interactions: {
        i1: {
          actionType: "Interaction",
          interactionType: "Email",
          description: "Account 1 Email 1",
          time: new Date().toISOString(),
        },
        i2: {
          actionType: "Interaction",
          interactionType: "Email",
          description: "Account 1 Email 2",
          time: new Date(0).toISOString(),
        },
        i3: {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date().toISOString(),
          description: "Notes regarding call with account 1",
        },
        i4: {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date(0).toISOString(),
          description: "More notes regarding another call with account 1",
        },
      },
      tasks: {
        t1: {
          actionType: "Task",
          title: "Account 1 Task 1",
          taskTypeId: 0,
          taskType: "Do something",
          timeDue: new Date(0).toISOString(),
        },
        t2: {
          actionType: "Task",
          title: "Account 1 Task 2",
          typeId: 1,
          taskType: "Do something else",
        },
      },
      notes: {
        n1: {
          actionType: "Note",
          title: "Account 1 Note 1",
          text: "[Note regarding account 1]",
        },
        n2: {
          actionType: "Note",
          title: "Account 1 Note 2",
          text: "[Another note regarding account 1]",
        },
      },
    },
    a2: {
      name: "Account No. 2",
      latestAction: "Note - 11:40 AM",
      website: "www.account2.com",
      address: "102 Some Parkway",
      industry: "Some other industry",
      interactions: {
        i1: {
          actionType: "Interaction",
          interactionType: "Email",
          description: "Account 2 Email 1",
          time: new Date().toISOString(),
        },
        i2: {
          actionType: "Interaction",
          interactionType: "Email",
          description: "Account 2 Email 2",
          time: new Date(0).toISOString(),
        },
        i3: {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date().toISOString(),
          description: "Notes regarding call with account 2",
        },
        i4: {
          actionType: "Interaction",
          interactionType: "Phone Call",
          time: new Date(0).toISOString(),
          description: "More notes regarding another call with account 2",
        },
      },
      tasks: {
        t1: {
          actionType: "Task",
          title: "Account 2 Task 1",
          taskTypeId: 0,
          taskType: "Do something",
          timeDue: new Date().toISOString(),
        },
        t2: {
          actionType: "Task",
          title: "Account 2 Task 2",
          typeId: 1,
          taskType: "Do something else",
          timeDue: new Date(0).toISOString(),
        },
      },
      notes: {
        n1: {
          actionType: "Note",
          title: "Account 2 Note 1",
          text: "[Note regarding account 2]",
        },
        n2: {
          actionType: "Note",
          title: "Account 2 Note 2",
          text: "[Another note regarding account 2]",
        },
      },
    },
  },
  interactionTypes: {
    t1: { name: "Phone Call" },
    t2: { name: "Email" },
    t3: { name: "Video Call" },
    t4: { name: "Meeting" },
    t5: { name: "Other" },
  },
  industries: {
    i1: { name: "Paper" },
    i2: { name: "Steel" },
    i3: { name: "IT" },
  },
};

export default dummyData;
