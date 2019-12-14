export const state = () => ({
  user: null
});

export const mutations = {
  setUser(state, user) {
    if (user) {
      if (user.student && !user.instructor) {
        user.isInstructor = false;
        user.name = user.student.name;
      } else if (!user.student && user.instructor) {
        user.isInstructor = true;
        user.name = user.instructor.name;
      }
    }
    state.user = user;
  }
};
