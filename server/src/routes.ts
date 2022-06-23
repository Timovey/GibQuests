import { Request, Response, Express } from "express";
import { user, quest } from './controllers';

export class Route {
  public constructor(
    public path: string,
    public method: "get" | "post" | "put" | "delete",
    public action: (request: Request, response: Response) => Promise<void>
  ) {}
}

/**
 * All application routes.
 */
const AppRoutes: Route[] = [
  {
      path: "/user",
      method: "get",
      action: user.get
  },

  {
    path: "/create",
    method: "post",
    action: quest.create
  },

  {
      path: "/register",
      method: "post",
      action: user.register
  },
  {
    path: "/auth",
    method: "post",
    action: user.auth
  },
  {
    path: "/processQuest",
    method: "post",
    action: quest.processQuest
  },
  {
    path: "/getProcessQuest",
    method: "get",
    action: quest.getProcessQuest
  },
  {
    path: "/trackQuest",
    method: "get",
    action: quest.trackQuest
  },
  {
    path: "/updateImage",
    method: "post",
    action: quest.updateImage
  },
  {
    path: "/getQuest",
    method: "get",
    action: quest.getQuest
  },
  {
    path: "/getQuests",
    method: "get",
    action: quest.getQuests
  },
  {
    path: "/deleteQuest",
    method: "delete",
    action: quest.deleteQuest
  },
  {
    path: "/getCreatedQuests",
    method: "get",
    action: quest.getCreatedQuests
  },
  {
    path: "/getImage",
    method: "get",
    action: quest.getImage
  },
  {
    path: "/getQr",
    method: "get",
    action: quest.getQR
  },
  {
    path: "/getCreatedQuest",
    method: "get",
    action: quest.getCreatedQuest
  },
  
   
];

export function initRoutes(app: Express) {
  AppRoutes.forEach((route) => {
    app[route.method](
      route.path,
      (request: Request, response: Response, next: Function) => {
        route
          .action(request, response)
          .then(() => next)
          .catch((err) => next(err));
      }
    );
  });
}