import styled from "styled-components";

const Bar = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 1px solid var(--color-grey-100, #eceff3);
  background: var(--color-grey-0, #fff);
`;

const Brand = styled.div`
  font-weight: 700;
  letter-spacing: .2px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: .75rem;
  color: var(--color-grey-600, #64748b);
`;

export default function Header() {
  
  return (
    <Bar>
      <Brand>The Wild Oasis</Brand>
      <Right>
      </Right>
    </Bar>
  );
}
