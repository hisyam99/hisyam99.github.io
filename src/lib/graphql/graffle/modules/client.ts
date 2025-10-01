import * as $$SchemaDrivenDataMap from "./schema-driven-data-map.js";
import * as $$Data from "./data.js";
import * as $$Scalar from "./scalar.js";
import * as $$Utilities from "graffle/utilities-for-generated";
import { TransportHttp } from "graffle/extensions/transport-http";
import { DocumentBuilder } from "graffle/extensions/document-builder";

const context = $$Utilities.pipe(
  $$Utilities.contextEmpty,
  (ctx) =>
    $$Utilities.Extensions.addAndApplyMany(ctx, [
      TransportHttp,
      DocumentBuilder,
    ]),
  (ctx) =>
    $$Utilities.Transports.configureCurrentOrThrow(ctx, {
      url: $$Data.defaultSchemaUrl,
    }),
  (ctx) =>
    $$Utilities.Configuration.add(ctx, {
      schema: {
        name: $$Data.Name,
        map: $$SchemaDrivenDataMap.schemaDrivenDataMap,
      },
    }),
  (ctx) => $$Utilities.Scalars.set(ctx, { scalars: $$Scalar.$registry }),
);

export const create = $$Utilities.createConstructorWithContext(context);
