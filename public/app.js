function MyApp() {
    const [itemList, setItemList] = React.useState([]);
    const [themeWhite, setThemeWhite] = React.useState(false);
    const [taskInput, setTaskInput] = React.useState('');
    const formatDate = date => {
        return new Intl.DateTimeFormat('en', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(new Date(date));
    };
    React.useEffect(() => {
        fetch('/api/todo', {
            method: 'get'
        })
            .then(res => res.json())
            .then(todos => {
                setItemList(todos);
            })
            .catch(e => console.log(e));
    }, []);
    function onSelectItem(id) {
        const item = itemList.find(item => item.id === id);

        if (!item) return;

        fetch('/api/todo/' + id, {
            method: 'put',
            headers: {'Content-Type': 'application/json'}, // header should be added if we pass something to server
            body: JSON.stringify({done: !item.done})
        }).then(res => res.json()).then(({todo}) => {
            setItemList(list =>
                list.map(item =>
                    item.id === todo.id ? { ...item, done: todo.done, updatedAt: todo.updatedAt } : item
                )
            );
        }).catch(e => console.log(e));
    }
    function onDeleteItem(id) {
        fetch('/api/todo/' + id, {
            method: 'delete'
        }).then(() => {
            setItemList(list => list.filter(item => item.id !== id));
        }).catch(e => console.log(e));

    }
    function onThemeChange() {
        setThemeWhite(!themeWhite);
    }
    function onSubmit(e) {
        e.preventDefault();
        if (!taskInput.trim()) return;

        fetch('/api/todo', {
            method: 'post',
            headers: {'Content-Type': 'application/json'}, // header should be added if we pass something to server
            body: JSON.stringify({title: taskInput})
        }).then(res => res.json()).then(({todo}) => {
            setItemList(list => [...list, todo]);
            setTaskInput('');
        }).catch(e => console.log(e));
    }
    return (
        <div className={themeWhite ? '' : 'dark'} style={{minHeight: '100vh', paddingBottom: '5rem'}}>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Todo list</a>
                    <ul className="right">
                        <li>
                            <label>
                                <input type="checkbox" className="filled-in" onChange={() => onThemeChange()} />
                                <span>White theme</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </nav>
            <form className="container" onSubmit={onSubmit}>
                <div className="row">
                    <p className="col s6 offset-s3 current-date">{formatDate(new Date())}</p>
                    <div className="col s6 offset-s3">
                        <p className="total-number">{itemList.length} tasks</p>
                    </div>
                    <div className="input-field col s6 offset-s3">
                        <input id="add-task" type="text" className="validate"
                               value={taskInput}
                               onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <label htmlFor="add-task">Add new task</label>
                    </div>
                </div>
            </form>

            <ul className="collection with-header container">
                <li className="collection-header">
                    {itemList.length > 0 ? (
                            <h4>Your tasks</h4>
                        ) :
                        <h4>There are no tasks</h4>
                    }
                </li>
                {itemList.map((item) => {
                    const { id, title, createdAt, updatedAt, done } = item;
                    return (
                        <li
                            className="collection-item"
                            key={id}
                        >
                            <div>
                                <label>
                                    <input type="checkbox"
                                           className="filled-in"
                                           checked={done}
                                           onChange={() => onSelectItem(id)}
                                    />
                                    <span style={{textDecoration: done ? 'line-through' : 'none'}}>{title}
                                        <span>Added: {formatDate(createdAt)}</span>
                                        <span>Updated: {formatDate(updatedAt)}</span>
                                    </span>
                                </label>
                            </div>
                            <a href="#" className="secondary-content" onClick={() => onDeleteItem(id)}>
                                <i className="material-icons">clear</i>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);