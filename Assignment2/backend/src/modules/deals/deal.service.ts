import Deal from "./deal.model.js";
export const getAllDeals = async () => {
    const data = await Deal.find();
    return data;
}