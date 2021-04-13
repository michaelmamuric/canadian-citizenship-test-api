# canadian-citizenship-test-api

This is a simple [RESTful API](https://searchapparchitecture.techtarget.com/definition/RESTful-API) created using Node.js, MongoDB, and Express, to pool sample practice questions that can be used for the [Canadian Citizenship Test](https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html).

This API is only available in English.

## How to Use

Questions can be accessed by issuing an [HTTP GET request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) to https://can-citizenship-api.herokuapp.com/questions. This will pool twenty (20) random questions, which mirrors the actual number of questions that will be asked on the real test.

## Sample Response, in JSON format
```javascript
{
  "province": "",
  "choices": [
    "Ottawa",
    "Toronto",
    "Montreal",
    "Hull"
    ],
    "_id": "6043b6327aa5b51e1887824c",
    "question": "What is the capital of Canada?",
    "correctAnswer": "Ottawa",
    "__v": 0,
    "questionId": 1
}
```

## Optional Parameter: province

You can also pass an optional ```province``` parameter. It is **not** case-sensitive.

If a [valid Canadian provincial or territorial code](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/completing-slips-summaries/financial-slips-summaries/return-investment-income-t5/provincial-territorial-codes.html) is supplied, the API will return eighteen (18) general questions, and two (2) questions specific for that province.

For example, both the following will return eighteen (18) general questions, and two (2) questions specific to the province of [Alberta](https://www.alberta.ca/index.aspx).
* https://can-citizenship-api.herokuapp.com/questions?province=AB
* https://can-citizenship-api.herokuapp.com/questions?province=ab 

If an invalid Canadian provincial or territorial code is supplied, the API will simply return twenty (20) general questions.
