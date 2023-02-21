import { ORY_PROJECT_URL, ORY_ACCESS_TOKEN } from "../config/manage";

import { 
    Configuration, 
    FrontendApi, 
    IdentityApi, 
    PermissionApi, 
    RelationshipApi 
} from "@ory/client";

const oryConfig = new Configuration({
    basePath: ORY_PROJECT_URL,
    baseOptions: {
      timeout: 4000
    }
});

export const ory = {
    frontend: new FrontendApi(oryConfig),

};