import { ApolloError } from 'apollo-client';
import { Operation, FetchResult } from 'apollo-link';
import { GraphQLError, ExecutionResult } from 'graphql';
import { Observer } from 'rxjs';
export declare class TestOperation {
    operation: Operation;
    private observer;
    constructor(operation: Operation, observer: Observer<FetchResult>);
    flush(result: ExecutionResult | ApolloError): void;
    networkError(error: Error): void;
    graphqlErrors(errors: GraphQLError[]): void;
}
