# Abs-olutely - Backend

## Sample Title

####  Sample Endpoints

## API Endpoints

#### <Sample> API

- <Purpose>

```
GET <http://{domain_name}:3000/books?from=&to=&title=>

* Request:
- Query param:
{
    from: <int> - optional,
    to: <int> - optional,
    title: <string> - optional
}

* Response:

- <200> success:
{
    data: [
        {
            id: <string>,
            title: <string>,
            pub_year: <int>,
            genre: <string>,
            author_id: <string>
        },
        ...
    ],
    status_code: 200
    message: <string>
}

- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```
