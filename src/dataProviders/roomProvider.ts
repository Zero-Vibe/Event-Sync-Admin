import jsonServerProvider from "ra-data-json-server";
import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  fetchUtils,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  Identifier,
  QueryFunctionContext,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from "react-admin";

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;

const baseDataProvider = jsonServerProvider(API_URL);

export const roomProvider: DataProvider = {
  ...baseDataProvider,
};
