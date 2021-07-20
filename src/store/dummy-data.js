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
        emails: [
          {
            subject: "Lead 1 Email 1",
            timeSent: new Date().toISOString(),
          },
          {
            subject: "Lead 1 Email 2",
            timeSent: new Date(0).toISOString(),
          },
        ],
        phoneCalls: [
          {
            timeMade: new Date().toISOString(),
            notes: "Notes regarding call with lead 1",
          },
          {
            timeMade: new Date(0).toISOString(),
            notes: "More notes regarding another call with lead 1",
          },
        ],
      },
      tasks: [
        {
          title: "Lead 1 Task 1",
          typeId: 0,
          type: "Do something",
        },
        {
          title: "Lead 1 Task 2",
          typeId: 1,
          type: "Do something else",
        },
      ],
      notes: [
        {
          title: "Lead 1 Note 1",
          text: "[Note regarding lead 1]",
        },
        {
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
      interactions: {
        emails: [
          {
            subject: "Lead 2 Email 1",
            timeSent: new Date().toISOString(),
          },
          {
            subject: "Lead 2 Email 2",
            timeSent: new Date(0).toISOString(),
          },
        ],
        phoneCalls: [
          {
            timeMade: new Date().toISOString(),
            notes: "Notes regarding call with lead 2",
          },
          {
            timeMade: new Date(0).toISOString(),
            notes: "More notes regarding another call with lead 2",
          },
        ],
      },
      tasks: [
        {
          title: "Lead 2 Task 1",
          typeId: 0,
          type: "Do something",
        },
        {
          title: "Lead 2 Task 2",
          typeId: 1,
          type: "Do something else",
        },
      ],
      notes: [
        {
          title: "Lead 2 Note 1",
          text: "[Note regarding lead 2]",
        },
        {
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
      interactions: {
        emails: [
          {
            subject: "Account 1 Email 1",
            timeSent: new Date().toISOString(),
          },
          {
            subject: "Account 1 Email 2",
            timeSent: new Date(0).toISOString(),
          },
        ],
        phoneCalls: [
          {
            timeMade: new Date().toISOString(),
            notes: "Notes regarding call with account 1",
          },
          {
            timeMade: new Date(0).toISOString(),
            notes: "More notes regarding another call with account 1",
          },
        ],
      },
      tasks: [
        {
          title: "Account 1 Task 1",
          typeId: 0,
          type: "Do something",
        },
        {
          title: "Account 1 Task 2",
          typeId: 1,
          type: "Do something else",
        },
      ],
      notes: [
        {
          title: "Account 1 Note 1",
          text: "[Note regarding account 1]",
        },
        {
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
      interactions: {
        emails: [
          {
            subject: "Account 2 Email 1",
            timeSent: new Date().toISOString(),
          },
          {
            subject: "Account 2 Email 2",
            timeSent: new Date(0).toISOString(),
          },
        ],
        phoneCalls: [
          {
            timeMade: new Date().toISOString(),
            notes: "Notes regarding call with account 2",
          },
          {
            timeMade: new Date(0).toISOString(),
            notes: "More notes regarding another call with account 2",
          },
        ],
      },
      tasks: [
        {
          title: "Account 2 Task 1",
          typeId: 0,
          type: "Do something",
        },
        {
          title: "Account 2 Task 2",
          typeId: 1,
          type: "Do something else",
        },
      ],
      notes: [
        {
          title: "Account 2 Note 1",
          text: "[Note regarding account 2]",
        },
        {
          title: "Account 2 Note 2",
          text: "[Another note regarding account 2]",
        },
      ],
    },
  },
};

export default dummyData;
