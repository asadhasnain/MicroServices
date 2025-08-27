# Kafka Architectural Team

Welcome to the Kafka Architectural Team repository. This project provides resources, documentation, and guidelines for working with Apache Kafka within the organization.

## Table of Contents

- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Run Kafka, kafka ui and keycloak 

    Run Kafka docker container

    ```bash
     docker-compose up -d
    ```

    To view the kafka Dashboard: http://localhost:8080/

3. Run the order and inventory service

    Run Order microservice:

    ```bash
     cd order
     npm run dev
    ```

    Run Inventory microservice:

    ```bash
     cd inventory
     npm run dev
    ```

    Run Gateway:

    ```bash
     cd gateway
     npm run dev
    ```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License.
