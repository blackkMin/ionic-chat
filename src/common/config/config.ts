import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";

@Injectable()
export class EnvironmentConfig {
    public apiEndPoint: string = environment.apiEndPoint;
}
