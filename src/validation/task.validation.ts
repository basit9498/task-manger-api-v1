import { checkSchema } from "express-validator";

const priority_value: string[] = ["HIGH", "MEDIUM", "LOW"];
const taskCreateValidation = checkSchema({
  task_name: {
    notEmpty: {
      bail: true,
      errorMessage: "task_name Required !",
    },
  },
  task_description: {
    trim: true,
  },
  task_priority: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "task_priority is Required !",
    },

    custom: {
      options: (value) => {
        if (priority_value.includes(value)) {
          return Promise.resolve();
        }
        return Promise.reject();
      },
      errorMessage: `task_priority value should be ["HIGH", "MEDIUM", "LOW"]`,
    },
  },
  task_dealine: {
    notEmpty: {
      errorMessage: "task_dealine is required !",
      bail: true,
    },
    custom: {
      options: (value) => {
        const yesterday_date = new Date(new Date().getTime() - 1);
        if (yesterday_date > new Date(value)) {
          return Promise.reject();
        }
        return Promise.resolve();
      },
      errorMessage: "task_dealine Should be set on comming dates",
    },
  },
});

export default taskCreateValidation;
