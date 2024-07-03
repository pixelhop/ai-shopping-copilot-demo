type TPowerUpArgs = Record<string, any>;
type TPowerUpHandler = (args: TPowerUpArgs) => Record<string, any>;
type TRegisterPowerUpParameters = {
  [key: string]: {
    type: "string" | "number" | "boolean" | "object";
    values?: (string | number | boolean)[];
    description: string;
    required: boolean;
  };
};

type TRegisterPowerUpData = {
  id?: string;
  name: string;
  description: string;
  parameters: TRegisterPowerUpParameters;
  handler?: TPowerUpHandler;
};

type TRegisteredPowerUp = {
  id: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  destroy: () => void;
  handler?: TPowerUpHandler;
};

interface Window {
    chatThing: {
        registerPowerUp(data: TRegisterPowerUpData): TRegisteredPowerUp;
        systemMessage(mode: "extend", message: string): void;
        showPreview(message: string, delay?: number): void;
        show(): void;
        hide(): void;
    };
}
