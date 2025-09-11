import { ChartTypeRegistry } from "chart.js";

declare module "chart.js" {
  interface PluginOptionsByType<TType extends keyof ChartTypeRegistry> {
    centerText?: {
      color?: string;
    };
  }
}
