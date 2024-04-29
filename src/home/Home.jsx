import { useSelector } from 'react-redux';
import { Hero } from 'src/components';

export { Home };

function Home() {
    const { user: authUser } = useSelector(x => x.auth);
    const { menu } = useSelector(x => x.menu);

    return (
        <>
            <Hero></Hero>
            <div>
                <h1>Hi {authUser?.firstName}!</h1>
                <p>You're logged in with React 18 + Redux & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {menu.length &&
                    <ul>
                        {menu.map(meal =>
                            <li key={meal.id}>{meal.name} {meal.description}</li>
                        )}
                    </ul>
                }
                {menu.loading && <div className="spinner-border spinner-border-sm"></div>}
                {menu.error && <div className="text-danger">Error loading users: {menu.error.message}</div>}
            </div>
        </>
    );
}