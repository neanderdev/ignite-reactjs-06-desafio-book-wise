import { filters } from '../../utils/books-filters';

import { Container, Filter } from './styles';

interface Props {
    filterSelected: string;
    updateFilter: (filter: string) => void;
}

export function Filters({ filterSelected, updateFilter }: Props) {
    return (
        <Container>
            {filters.map(filter => (
                <Filter
                    key={filter.id}
                    isSelected={filterSelected === filter.value}
                    onClick={() => updateFilter(filter.value)}
                >
                    {filter.text}
                </Filter>
            ))}
        </Container>
    )
}