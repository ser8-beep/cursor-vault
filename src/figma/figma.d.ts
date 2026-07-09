declare module "figma" {
  interface InstanceHandle {
    type: "INSTANCE";
    getString(name: string): string;
    getBoolean(name: string, mapping?: { true: unknown; false: unknown }): boolean;
    getEnum<T>(name: string, mapping: Record<string, T>): T;
    getInstanceSwap(name: string): InstanceHandle | null;
    executeTemplate(): { example: unknown[]; metadata: Record<string, unknown> };
  }

  interface FigmaCodeConnect {
    selectedInstance: InstanceHandle;
    code(strings: TemplateStringsArray, ...values: unknown[]): unknown[];
  }

  const figma: FigmaCodeConnect;
  export default figma;
}
