import { DB } from "../common/config/db.config";
import { Test } from "../models/test.model-postgre.ts";

// * test
export const testServices = async () => {
  const testRepository = DB.getRepository(Test);

  const regulationList = await testRepository.find();

  return regulationList;
};
