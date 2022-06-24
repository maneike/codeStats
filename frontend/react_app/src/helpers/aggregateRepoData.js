const aggregateRepoData = (repos) => {
  //  {
  //   repoName: "testrepo",
  //   merged_users: [
  //     {
  //       old_name: "marcin witkowski",
  //       old_email: "marcin.witkowski@e-qsg.com",
  //       new_name: "test",
  //       new_email: "atest@atest.com",
  //     },
  //   ],
  // };

  const newRepos = [];
  typeof repos == Array
    ? repos?.map((repo) => {
        newRepos.push({
          repoName: repo.repo_name,
          merged_users: repo.users?.map((user) => ({
            old_name: user.name,
            old_email: user.email,
            new_name: user.name,
            new_email: user.email,
          })),
        });
      })
    : newRepos.push({
        repoName: repos.repo_name,
        merged_users: repos.users?.map((user) => ({
          old_name: user.name,
          old_email: user.email,
          new_name: user.name,
          new_email: user.email,
        })),
      });

  return newRepos;
};

export default aggregateRepoData;

// { name: "Martin", email: "martin@gmail.com" },
// { name: "Martin", email: "nikodem@gmail.com" },
// { name: "Martin", email: "mateusz@gmail.com" },

//      same
// {
//   old_name: user.name,
//   old_email: user.email,
//   new_name: "Martin",
//   new_email: "martin@gmail.com",
// },
// {
//   old_name: user.name,
//   old_email: user.email,
//   new_name: "Martin",
//   new_email: "martin@gmail.com",
// };

//      two same names
// {
//   old_name: user.name,
//   old_email: user.email,
//   new_name: "Martin",
//   new_email: "martin@gmail.com",
// },
// {
//   old_name: user.name,
//   old_email: user.email,
//   new_name: "Martin", name - e.target.value
//   new_email: "nikodem@gmail.com", email - e.target.value
// };

//      two same emails
// {
//   old_name: user.name,
//   old_email: user.email,
//   new_name: "Martin",
//   new_email: "martin@gmail.com",
// },
// {
//   old_name: user.name,
//   old_email: user.email,
//   new_name: "Martin",
//   new_email: "martin@gmail.com",
// };

// API

// POST na /api/merged/
// const obj2 = {
//   repo_name: "PRA2021-PRA2022",
//   merged_users: [
//     {
//       old_name: "marcin witkowski",
//       old_email: "marcin.witkowski@e-qsg.com",
//       new_name: "test",
//       new_email: "atest@atest.com",
//     },
//     {
//       old_name: "THINK",
//       old_email: "witkowski.mar@gmail.com",
//       new_name: "test1",
//       new_email: "atest1@atest.com",
//     },
//     {
//       old_name: "Tomasz Zietkiewicz",
//       old_email: "tomek.zietkiewicz@gmail.com",
//       new_name: "test2",
//       new_email: "atest2@atest.com",
//     },
//     {
//       old_name: "mawit",
//       old_email: "marcin.witkowski@rockwool.com",
//       new_name: "test3",
//       new_email: "atest3@atest.com",
//     },
//     {
//       old_name: "Anwar Ziani",
//       old_email: "anwaar.ziani@gmail.com",
//       new_name: "test4",
//       new_email: "atest4@atest.com",
//     },
//     {
//       old_name: "Do Nhu Vy",
//       old_email: "donhuvy@Dos-MacBook-Pro.local",
//       new_name: "test5",
//       new_email: "atest5@atest.com",
//     },
//     {
//       old_name: "Rajeev Kumar Singh",
//       old_email: "rajeevs@flock.co",
//       new_name: "test6",
//       new_email: "atest6@atest.com",
//     },
//     {
//       old_name: "Rajeev Singh",
//       old_email: "callicoder@gmail.com",
//       new_name: "test6",
//       new_email: "atest66@atest.com",
//     },
//   ],
// };
