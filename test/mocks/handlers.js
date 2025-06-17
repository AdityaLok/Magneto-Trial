import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://magento.softwaretestingboard.com/rest/V1/orders/:orderId', ({ params }) => {
    return HttpResponse.json(
      {
        entity_id: params.orderId,  
        status: "processing",      
        items: [{ sku: "MOCK_SKU", qty: 1 }]
      },
      { status: 200 }  
    );
  })
];