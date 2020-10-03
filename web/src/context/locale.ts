import React from "react";

type CountryType = string | null;
type CampaignType = string | null;

export interface LocaleContextObject {
  country: CountryType;
  campaign: CampaignType;
}

export const EmptyLocaleContext: LocaleContextObject = {
  country: null,
  campaign: null,
};

export const LocaleContext = React.createContext({
  locale: EmptyLocaleContext,
  setLocale: (update: any) => {},
});
