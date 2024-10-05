import { PROJECT_LIST } from "./constant";

// 校验 projectKey 合法性
export const isProjectKey = function (projectKey: string) {
  const combinedItems = PROJECT_LIST.reduce((acc: string[], item) => {
    return acc.concat(item.items);
  }, []);

  return !!(combinedItems.indexOf(projectKey) != -1);
};
