import ProviderModel from "@models/provider.model";

import { ProviderAttributes } from "@types-internal/provider/provider-attributes";

export const getProviderById = async (
    providerId: string
  ): Promise<ProviderAttributes | null> => {
    const createdCheckout = await ProviderModel.findOne({
      where: { id: providerId }
    });
    return createdCheckout ? createdCheckout.get() : null;
  }
;
