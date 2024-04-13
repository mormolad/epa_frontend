import cards from './AssessmentPage.json';
import styles from './AssessmentPage.module.scss';
import AssessmentCard from '../AssessmentCard/AssessmentCard.jsx';
import AssessmentFilter from '../AssessmentFilter/AssessmentFilter.jsx';

function AssessmentPage() {
  return (
    <section className={styles.assessment__container}>
      <AssessmentFilter />
      <ul className={styles.assessment__list}>
        {/* Текст карточек пока приходит из json */}
        {cards.map((card) => (
          <AssessmentCard key={card.id} name={card.name} job={card.job} />
        ))}
      </ul>
    </section>
  );
}

export default AssessmentPage;
